'user strict'

var bcrypt = require('bcryptjs');
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
                    message: 'Error getting users',
                    error: err
                })
            }

            User.count((err, total) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error counting users',
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
                    message: 'Error getting user',
                    error: err
                })
            }

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    message: 'User does not exists'
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
        email: body.email,
        password: encryptedPassword,
        img: 'null',
        role: body.role
    });

    user.save((err, userSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error registering user',
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
                message: 'Error deleting user',
                error: err
            })
        }

        if (!userDeleted) {
            return res.status(404).json({
                ok: false,
                message: 'User does not exists'
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
        if (['ADMIN_ROLE', 'USER_ROLE'].indexOf(req.body.role) < 0) {
            return res.status(400).json({
                ok: false,
                message: 'Role is not valid'
            })
        }
    }

    if (req.body.password) {
        return res.status(400).json({
            ok: false,
            message: 'You can not update password'
        })
    }

    User.findByIdAndUpdate(userId, updateBody, (err, userUpdated) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error updating user',
                error: err
            })
        }

        if (!userUpdated) {
            return res.status(404).json({
                ok: false,
                message: 'User does not exists'
            });
        };

        return res.status(200).json({
            ok: true,
            userUpdatedId: userId,
            dataUpdated: updateBody
        })
    })

}

module.exports = {
    registerUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
};