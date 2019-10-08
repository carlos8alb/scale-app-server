'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var measureSchema = new Schema({
    peso: { type: String, required: false },
    altura: { type: String, required: false },
    pa: { type: String, required: false },
    t: { type: String, required: false },
    imc: { type: String, required: false },
    ccintura: { type: String, required: false },
    ccadera: { type: String, required: false },
    pab: { type: String, required: false },
    pb: { type: String, required: false },
    pt: { type: String, required: false },
    psubescapular: { type: String, required: false },
    ppantorrilla: { type: String, required: false },
    pmuslomax: { type: String, required: false },
    cbt: { type: String, required: false },
    cbr: { type: String, required: false },
    cmuslomax: { type: String, required: false },
    pantorrillamax: { type: String, required: false },
    notas: { type: String, required: false },
    img: { type: String, required: false },
    pacientId: {
        type: Schema.Types.ObjectId,
        ref: 'Pacient',
        unique: false,
        required: [true, 'El atributo paciente es requerido.']
    }
}, { timestamps: true });

module.exports = mongoose.model('Measure', measureSchema);