'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pacientSchema = new Schema({
    dni: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: [true, 'El atributo nombre es requerido.']
    },
    surname: {
        type: String,
        required: [true, 'El atributo apellido es requerido.']
    },
    birthdate: {
        type: Date,
        required: [true, 'El atributo fecha de nacimiento es requerido.']
    },
    address: {
        type: String,
        required: false
    },
    socialInsureance: {
        type: String,
        required: false
    },
    placeAppointment: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    contactNumber: {
        type: String,
        required: [true, 'El atributo teléfono de contacto es requerido.']
    },
    img: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El atributo usuario es requerido.']
    }
}, { timestamps: true });

module.exports = mongoose.model('Pacient', pacientSchema);