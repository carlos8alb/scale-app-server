'use strict'

var Pacient = require('../models/pacient');

function getPacients(req, res) {
    var from = Number(req.query.from) || 0;
    var itemsPage = Number(req.query.itemspage) || 10;
    var sortBy = req.query.sortby || '';
    var textSearched = req.query.textSearched || '';
    var userId = req.query.userId;

    //Search in any caracter string
    var regExp = new RegExp(textSearched, 'i');

    Pacient.find({ user: userId, $or: [{ dni: regExp }, { name: regExp }, { surname: regExp }] })
        // .or([{ dni: regExp }, { name: regExp }, { surname: regExp }])
        .sort(sortBy)
        .skip(from)
        .limit(itemsPage)
        .exec((err, pacients) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener pacientes.',
                    error: err
                })
            }

            let totalPacients = pacients.length

            return res.status(200).json({
                ok: true,
                pacients: pacients,
                total: totalPacients
            })

        })

}

function getPacient(req, res) {
    var pacientId = req.params.id;

    Pacient.findById(pacientId)
        .exec((err, pacient) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener pacientes.',
                    error: err
                })
            }

            if (!pacient) {
                return res.status(404).json({
                    ok: false,
                    message: 'El paciente no existe.'
                });
            };

            return res.status(200).json({
                ok: true,
                pacient: pacient
            })
        })

}

function registerPacient(req, res) {
    var body = req.body;
    var user = req.user;

    var pacient = new Pacient({
        dni: body.dni,
        name: body.name,
        surname: body.surname,
        birthday: body.birthday,
        address: body.address,
        socialInsureance: body.socialInsureance,
        placeAppointment: body.placeAppointment,
        email: body.email,
        contactNumber: body.contactNumber,
        img: body.img,
        user: req.user
    });

    pacient.save((err, pacientSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error registrando el paciente.',
                error: err
            })
        }

        return res.status(200).json({
            ok: true,
            pacient: pacientSaved
        })

    })

}

function deletePacient(req, res) {
    var pacientId = req.params.id;

    Pacient.findByIdAndRemove(pacientId, (err, pacientDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error eliminando el paciente.',
                error: err
            })
        }

        if (!pacientDeleted) {
            return res.status(404).json({
                ok: false,
                message: 'El paciente no existe.'
            });
        };

        return res.status(200).json({
            ok: true,
            pacient: pacientDeleted
        })
    })
}

function updatePacient(req, res) {
    var pacientId = req.params.id;
    var updateBody = req.body;

    Pacient.findByIdAndUpdate(pacientId, updateBody, (err, pacientUpdated) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error actualizando paciente.',
                error: err
            })
        }

        if (!pacientUpdated) {
            return res.status(404).json({
                ok: false,
                message: 'El paciente no existe.'
            });
        };

        return res.status(200).json({
            ok: true,
            pacientUpdatedId: pacientId,
            dataUpdated: updateBody
        })
    })

}

module.exports = {
    registerPacient,
    getPacients,
    getPacient,
    deletePacient,
    updatePacient
};
