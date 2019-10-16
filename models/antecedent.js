'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var antecedentSchema = new Schema({
    personal: {
        type: String,
        required: false
    },
    family: {
        type: String,
        required: false
    },
    medication: {
        type: String,
        required: false
    },
    biochemical: {
        type: String,
        required: false
    },
    others: {
        type: String,
        required: false
    },
    pacientId: {
        type: Schema.Types.ObjectId,
        ref: 'Pacient',
        unique: true,
        required: [true, 'El atributo paciente es requerido.']
    }
}, { timestamps: true });

antecedentSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' });

module.exports = mongoose.model('Antecedent', antecedentSchema);