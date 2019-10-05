'use strict'

var Antecedent = require('../models/antecedent');

function getAntecedent(req, res) {
    var pacientId = req.params.pacientId;

    Antecedent.findOne({ pacientId: pacientId }, (err, antecedent) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener antecedentes.',
                error: err
            })
        }

        if (!antecedent) {
            return res.status(404).json({
                ok: false,
                message: 'El antecedent no existe.'
            });
        };

        return res.status(200).json({
            ok: true,
            antecedent: antecedent
        })
    })

}

function registerAntecedent(req, res) {
    var body = req.body;

    var antecedent = new Antecedent({
        personal: body.personal,
        family: body.family,
        medication: body.medication,
        biochemical: body.biochemical,
        pacientId: body.pacientId
    });

    antecedent.save((err, antecedentSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error registrando el antecedente.',
                error: err
            })
        }

        return res.status(200).json({
            ok: true,
            antecedent: antecedentSaved
        })

    })

}

// function deleteAntecedent(req, res) {
//     var antecedentId = req.params.id;

//     Antecedent.findByIdAndRemove(antecedentId, (err, antecedentDeleted) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 message: 'Error eliminando el antecedente.',
//                 error: err
//             })
//         }

//         if (!antecedentDeleted) {
//             return res.status(404).json({
//                 ok: false,
//                 message: 'El antecedente no existe.'
//             });
//         };

//         return res.status(200).json({
//             ok: true,
//             antecedent: antecedentDeleted
//         })
//     })
// }

function updateAntecedent(req, res) {
    var pacientId = req.params.pacientId;
    var updateBody = req.body;

    if (req.body.pacientId) {
        return res.status(404).json({
            ok: false,
            message: 'No puede modificar el paciente.'
        });
    }

    Antecedent.findOneAndUpdate({ pacientId: pacientId }, updateBody, (err, antecedentUpdated) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error actualizando antecedente.',
                error: err
            })
        }

        if (!antecedentUpdated) {
            return res.status(404).json({
                ok: false,
                message: 'El antecedente no existe.'
            });
        };

        return res.status(200).json({
            ok: true,
            pacienteAntecedentUpdatedId: pacientId,
            dataUpdated: updateBody
        })
    })

}

module.exports = {
    registerAntecedent,
    getAntecedent,
    updateAntecedent
};