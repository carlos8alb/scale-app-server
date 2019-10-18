'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var measureSchema = new Schema({
    pesoActual: { type: Number, required: false },
    talla: { type: Number, required: false },
    tallaSentado: { type: Number, required: false },
    envergadura: { type: Number, required: false },
    imc: { type: Number, required: false },

    acromialRadial: { type: Number, required: false },
    radialEstiloidea: { type: Number, required: false },
    medialEstiloideaDactilar: { type: Number, required: false },
    ilioespinal: { type: Number, required: false },
    trocanterea: { type: Number, required: false },
    trocantereaTrivialLateral: { type: Number, required: false },
    tribialLateral: { type: Number, required: false },
    tribialMedialMaleolarMedial: { type: Number, required: false },
    pie: { type: Number, required: false },

    biacromial: { type: Number, required: false },
    toraxTransverso: { type: Number, required: false },
    toraxAnteroposterior: { type: Number, required: false },
    biIliocrestidio: { type: Number, required: false },
    humeral: { type: Number, required: false },
    femoral: { type: Number, required: false },
    munecaBiestiloideo: { type: Number, required: false },
    tobilloBiestiloideo: { type: Number, required: false },

    cabeza: { type: Number, required: false },
    cuello: { type: Number, required: false },
    brazoRelajado: { type: Number, required: false },
    brazoFlexEnTension: { type: Number, required: false },
    antebrazo: { type: Number, required: false },
    muneca: { type: Number, required: false },
    toraxMesoesternal: { type: Number, required: false },
    cinturaMinima: { type: Number, required: false },
    abdominalMaximo: { type: Number, required: false },
    caderasMaxima: { type: Number, required: false },
    musloSuperior: { type: Number, required: false },
    musloMedial: { type: Number, required: false },
    pantorrillaMaxima: { type: Number, required: false },
    tobilloMinima: { type: Number, required: false },

    triceps: { type: Number, required: false },
    subescapular: { type: Number, required: false },
    biceps: { type: Number, required: false },
    crestaIliaca: { type: Number, required: false },
    supraespinal: { type: Number, required: false },
    abdominal: { type: Number, required: false },
    musloAnterior: { type: Number, required: false },
    pantorrilla: { type: Number, required: false },

    date: { type: String, required: false },
    others: { type: String, required: false },
    img: { type: String, required: false },
    pacientId: {
        type: Schema.Types.ObjectId,
        ref: 'Pacient',
        unique: false,
        required: [true, 'El atributo paciente es requerido.']
    }
}, { timestamps: true });

module.exports = mongoose.model('Measure', measureSchema);