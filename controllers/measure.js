'use strict'

var Measure = require('../models/measure');

function getMeasures(req, res) {
    var pacientId = req.params.pacientId;

    Measure.find({ pacientId: pacientId }, (err, measure) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener los datos antropométricos.',
                error: err
            })
        }

        if (!measure) {
            return res.status(404).json({
                ok: false,
                message: 'Los datos antropométricos no existen.'
            });
        };

        return res.status(200).json({
            ok: true,
            measure: measure
        })
    })

}

function registerMeasure(req, res) {
    var body = req.body;

    var measure = new Measure({
        peso: body.peso,
        altura: body.altura,
        pa: body.pa,
        t: body.t,
        imc: body.imc,
        ccintura: body.ccintura,
        ccadera: body.ccadera,
        pab: body.pab,
        pb: body.pb,
        pt: body.pt,
        psubescapular: body.psubescapular,
        ppantorrilla: body.ppantorrilla,
        pmuslomax: body.pmuslomax,
        cbt: body.cbt,
        cbr: body.cbr,
        cmuslomax: body.cmuslomax,
        pantorrillamax: body.pantorrillamax,
        notas: body.notas,
        img: body.img,
        pacientId: body.pacientId
    })

    measure.save((err, measureSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error registrando los datos antropométricos.',
                error: err
            })
        }

        return res.status(200).json({
            ok: true,
            measure: measureSaved
        })

    })

}

function deleteMeasure(req, res) {
    var measureId = req.params.id;

    Measure.findByIdAndRemove(measureId, (err, measureDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error eliminando los datos antropométricos.',
                error: err
            })
        }

        if (!measureDeleted) {
            return res.status(404).json({
                ok: false,
                message: 'Los datos antropométricos no existen.'
            });
        };

        return res.status(200).json({
            ok: true,
            measure: measureDeleted
        })
    })
}

function updateMeasure(req, res) {
    var measureId = req.params.id;
    var updateBody = req.body;

    if (req.body.measureId) {
        return res.status(404).json({
            ok: false,
            message: 'No puede modificar el id de los datos antropométricos.'
        });
    }

    Measure.findOneAndUpdate({ _id: measureId }, updateBody, (err, measureUpdated) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error actualizando los datos antropométricos.',
                error: err
            })
        }

        if (!measureUpdated) {
            return res.status(404).json({
                ok: false,
                message: 'Los datos antropométricos no existen.'
            });
        };

        return res.status(200).json({
            ok: true,
            measureUpdatedId: measureId,
            dataUpdated: updateBody
        })
    })

}

module.exports = {
    getMeasures,
    registerMeasure,
    deleteMeasure,
    updateMeasure
};