'use strict'

var express = require('express');
var PacientController = require('../controllers/pacient');

var app = express();

// middleware
var mdAutenticacion = require('../middlewares/autentication');

var app = express.Router();

app.get('/', PacientController.getPacients);
app.get('/:id', PacientController.getPacient);
app.post('/register', mdAutenticacion.verifyToken, PacientController.registerPacient);
app.delete('/:id', mdAutenticacion.verifyToken, PacientController.deletePacient);
app.put('/update/:id', mdAutenticacion.verifyToken, PacientController.updatePacient);

module.exports = app;