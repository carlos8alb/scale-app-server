'use strict'

var bcrypt = require('bcryptjs');
var uniqid = require('uniqid');
var request = require('request');

var User = require('../models/user');

function getUsers(req, res) {
    var from = Number(req.query.from) || 0;
    var itemsPage = Number(req.query.itemspage) || 10;
    var sortBy = req.query.sortby || '';

    User.find({}, 'name surname email img role')
        .sort(sortBy)
        .skip(from)
        .limit(itemsPage)
        .exec((err, users, total) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener usuarios.',
                    error: err
                })
            }

            User.count((err, total) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error obteniendo el total de usuarios.',
                        error: err
                    })
                }

                return res.status(200).json({
                    ok: true,
                    users: users,
                    total: total
                })
            })

        })
}

function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId).select('name surname email img role')
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener usuarios.',
                    error: err
                })
            }

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    message: 'El usuario no existe.'
                });
            };

            return res.status(200).json({
                ok: true,
                user: user
            })
        })

}

function registerUser(req, res) {
    var body = req.body;
    var encryptedPassword = '';

    if (body.password) {
        encryptedPassword = bcrypt.hashSync(body.password, 10);
    }

    var user = new User({
        name: body.name,
        surname: body.surname,
        email: body.email.toLowerCase(),
        password: encryptedPassword,
        img: 'null',
        role: body.role
    });

    user.save((err, userSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error registrando el usuario.',
                error: err
            })
        }

        userSaved.password = '';
        return res.status(200).json({
            ok: true,
            user: userSaved
        })

    })

}

function deleteUser(req, res) {
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, userDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error eliminando el usuario.',
                error: err
            })
        }

        if (!userDeleted) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no existe.'
            });
        };

        return res.status(200).json({
            ok: true,
            user: userDeleted
        })
    })
}

function updateUser(req, res) {
    var userId = req.params.id;
    var updateBody = req.body;

    // Check if the string is in the array
    if (req.body.role) {
        if (['ADMIN_ROLE', 'USER_ROLE', 'DEMO_ROLE'].indexOf(req.body.role) < 0) {
            return res.status(400).json({
                ok: false,
                message: 'El rol no es válido.'
            })
        }
    }


    // if (req.body.password || req.body.email) {
    //     return res.status(400).json({
    //         ok: false,
    //         message: 'No puede actualizar la contraseña o email.'
    //     })
    // }


    User.findById(userId, (err, userUpdated) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error actualizando usuario.',
                error: err
            })
        }

        if (!userUpdated) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no existe.'
            });
        };

        // FIELDS TO MODIFY
        userUpdated.name = updateBody.name;
        userUpdated.surname = updateBody.surname;
        userUpdated.role = updateBody.role;

        userUpdated.save((err, userSaved) => {

            if (!userSaved) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error actualizando usuario.',
                    error: err
                });
            }

            // No mostrar contraseña en el post
            userSaved.password = '';

            return res.status(200).json({
                ok: true,
                userUpdatedId: userId,
                user: userSaved
            })

        })
    })
}

function getUserByEmail(req, res) {
    var userEmail = req.params.email;

    User.findOne({ email: userEmail }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener usuario.',
                error: err
            })
        }

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no existe.'
            });
        };

        userDB.recoverPasswordId = uniqid();

        userDB.save((err, userSaved) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener usuario.',
                    error: err
                })
            }

            userSaved.password = '';

            return res.status(200).json({
                ok: true,
                message: 'El usuario fue obtenido correctamente.',
                user: userSaved
            })
        })

    })

}

function resetPassword(req, res) {
    var recoverpasswordid = req.params.recoverpasswordid;
    var password = req.body.password;

    User.findOne({ recoverPasswordId: recoverpasswordid }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener usuario.',
                error: err
            })
        }

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no existe.'
            });
        };

        userDB.password = bcrypt.hashSync(password, 10);
        userDB.recoverPasswordId = 'null';

        userDB.save((err, userSaved) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener usuario.',
                    error: err
                })
            }

            if (!userSaved) {
                return res.status(404).json({
                    ok: false,
                    message: 'Error al actualizar password.'
                });
            };

            return res.status(200).json({
                ok: true,
                message: 'Contraseña actualizada correctamente.'
            })
        })

    })

}

function checkCaptcha(req, res) {
    const secretKey = req.body.secretKey;
    const captchaResponse = req.body.captchaResponse;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${ secretKey }&response=${ captchaResponse }`;

    request.post(url, (error, response) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al verificar captcha.',
                error: error
            })
        }

        var bodyResult = JSON.parse(response.body);

        return res.status(200).json({
            ok: true,
            success: bodyResult.success
        })
    });

}

function changePassword(req, res) {
    const oldPassword = req.body.oldPassword || '';
    const newPassword = req.body.newPassword || '';
    const id = req.params.id;

    User.findById(id, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar usuario.',
                error: error
            })
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                message: 'No se encontró el usuario.'
            })
        }

        if (!bcrypt.compareSync(oldPassword, userDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'La contraseña actual es incorrecta.'
            })
        }

        userDB.password = bcrypt.hashSync(newPassword, 10);

        userDB.save((err, userSaved) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al guardar nueva contraseña.',
                    error: error
                })
            }

            if (!userSaved) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al guardar nueva contraseña.',
                })
            }

            userSaved.password = '';
            return res.status(200).json({
                ok: true,
                message: 'La contraseña se actualizó correctamente.',
                user: userSaved
            })

        });

    })

}

module.exports = {
    registerUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getUserByEmail,
    resetPassword,
    checkCaptcha,
    changePassword
};