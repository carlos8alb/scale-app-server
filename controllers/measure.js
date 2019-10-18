'use strict'

var Measure = require('../models/measure');

function getMeasures(req, res) {
    var pacientId = req.params.pacientId;

    Measure.find({ pacientId: pacientId })
        .sort('date')
        .exec((err, measures) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener los datos antropométricos.',
                    error: err
                })
            }

            if (!measures) {
                return res.status(404).json({
                    ok: false,
                    message: 'Los datos antropométricos no existen.'
                });
            };

            return res.status(200).json({
                ok: true,
                measures: measures
            })
        })

}

function getMeasure(req, res) {
    var id = req.params.id;

    Measure.findById(id, (err, measure) => {
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

        pesoActual: body.pesoActual,
        talla: body.talla,
        tallaSentado: body.tallaSentado,
        envergadura: body.envergadura,
        imc: body.imc,

        acromialRadial: body.acromialRadial,
        radialEstiloidea: body.radialEstiloidea,
        medialEstiloideaDactilar: body.medialEstiloideaDactilar,
        ilioespinal: body.ilioespinal,
        trocanterea: body.trocanterea,
        trocantereaTrivialLateral: body.trocantereaTrivialLateral,
        tribialLateral: body.tribialLateral,
        tribialMedialMaleolarMedial: body.tribialMedialMaleolarMedial,
        pie: body.pie,

        biacromial: body.biacromial,
        toraxTransverso: body.toraxTransverso,
        toraxAnteroposterior: body.toraxAnteroposterior,
        biIliocrestidio: body.biIliocrestidio,
        humeral: body.humeral,
        femoral: body.femoral,
        munecaBiestiloideo: body.munecaBiestiloideo,
        tobilloBiestiloideo: body.tobilloBiestiloideo,

        cabeza: body.cabeza,
        cuello: body.cuello,
        brazoRelajado: body.brazoRelajado,
        brazoFlexEnTension: body.brazoFlexEnTension,
        antebrazo: body.antebrazo,
        muneca: body.muneca,
        toraxMesoesternal: body.toraxMesoesternal,
        cinturaMinima: body.cinturaMinima,
        abdominalMaximo: body.abdominalMaximo,
        caderasMaxima: body.caderasMaxima,
        musloSuperior: body.musloSuperior,
        musloMedial: body.musloMedial,
        pantorrillaMaxima: body.pantorrillaMaxima,
        tobilloMinima: body.tobilloMinima,

        triceps: body.triceps,
        subescapular: body.subescapular,
        biceps: body.biceps,
        crestaIliaca: body.crestaIliaca,
        supraespinal: body.supraespinal,
        abdominal: body.abdominal,
        musloAnterior: body.musloAnterior,
        pantorrilla: body.pantorrilla,

        date: body.date,
        others: body.others,
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

    // if (req.body.pacientId) {
    //     return res.status(400).json({
    //         ok: false,
    //         message: 'No puede modificar el paciente.'
    //     })
    // }

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
    getMeasure,
    registerMeasure,
    deleteMeasure,
    updateMeasure
};