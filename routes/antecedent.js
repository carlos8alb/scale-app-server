'use strict'

var express = require('express');
var AntecedentController = require('../controllers/antecedent');

var app = express();

// middleware
var mdAutenticacion = require('../middlewares/autentication');

var app = express.Router();

app.get('/:pacientId', AntecedentController.getAntecedent);
app.post('/register', mdAutenticacion.verifyToken, AntecedentController.registerAntecedent);
app.put('/update/:pacientId', mdAutenticacion.verifyToken, AntecedentController.updateAntecedent);

module.exports = app;