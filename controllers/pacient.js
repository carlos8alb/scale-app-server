'use strict'

var Pacient = require('../models/pacient');

function getPacients(req, res) {
    var from = Number(req.query.from) || 0;
    var itemsPage = Number(req.query.itemspage) || 10;
    var sortBy = req.query.sortby || '';

    Pacient.find({})
        .sort(sortBy)
        .skip(from)
        .limit(itemsPage)
        .exec((err, pacients, total) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener pacientes.',
                    error: err
                })
            }

            Pacient.count((err, total) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error obteniendo el total de pacientes.',
                        error: err
                    })
                }

                return res.status(200).json({
                    ok: true,
                    pacients: pacients,
                    total: total
                })
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
        birthdate: body.birthdate,
        address: body.address,
        socialInsureance: body.socialInsureance,
        placeAppoitment: body.placeAppoitment,
        email: body.email.toLowerCase(),
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