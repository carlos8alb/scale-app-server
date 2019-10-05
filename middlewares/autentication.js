var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// Verify token

exports.verifyToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Token incorrect',
                errors: err
            });
        }

        req.user = decoded.user;

        next();

    });
}

// Verficar user role (check demo user)

// exports.verificaRole = function(req, res, next) {
//     var usuario = req.usuario;
//     var id = req.params.id;

//     if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
//         next();
//     } else {
//         return res.status(401).json({
//             ok: false,
//             mensaje: 'Token incorrecto - Role'
//         });
//     }
// }