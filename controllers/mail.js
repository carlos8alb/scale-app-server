'use strict'

const nodemailer = require('nodemailer');
const mailConfig = require('../config/config').MAIL;

async function send(req, res) {
    var body = req.body;

    let transporter = nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: mailConfig.user,
            pass: mailConfig.pass
        }
    });

    let mailOptions = {
        from: body.from || '"Scale App" <mail@scale-app.com>',
        to: body.to,
        subject: body.subject,
        html: body.body
    }

    await transporter.sendMail(mailOptions, (err, info) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al enviar el mail.',
                error: err
            })
        }

        return res.status(200).json({
            ok: true,
            message: 'El mail se envió correctamente.',
            info: info
        })

    });

}

module.exports = {
    send
};