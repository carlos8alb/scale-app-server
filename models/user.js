'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'DEMO_ROLE'],
    message: '{VALUE} no es un rol válido.'
};

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El atributo nombre es requerido.']
    },
    surname: {
        type: String,
        required: [true, 'El atributo apellido es requerido.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El atributo email es requerido.']
    },
    password: {
        type: String,
        required: [true, 'El atributo contrseña es requerido.']
    },
    img: {
        type: String,
        required: false,
        default: 'null'
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: validRoles
    },
    recoverPasswordId: {
        type: String,
        required: true,
        default: 'null'
    }
}, { timestamps: true });

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' });

module.exports = mongoose.model('User', userSchema);