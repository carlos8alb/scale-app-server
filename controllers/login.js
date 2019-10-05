'use strict'

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const SEED = require('../config/config').SEED;
var User = require('../models/user');

function login(req, res) {
    var body = req.body;

    User.findOne({ email: body.email.toLowerCase() }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error el intentar ingresar a la aplicación.',
                error: err
            })
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrecta.'
            })
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrecta.'
            });
        }

        //Create Token
        userDB.password = '';
        var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 60 * 60 * 24 }); //One day

        res.status(200).json({
            ok: true,
            user: userDB,
            token: token,
            id: userDB.id
        });

    })
}

// function renewToken(req, res) {

//     var userId = req.params.id;

//     User.findById(userId, (err, userDB) => {

//         var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 60 * 60 * 24 });

//         return res.status(200).json({
//             ok: true,
//             token: token
//         });

//     })

// }

module.exports = {
    // renewToken,
    login
};