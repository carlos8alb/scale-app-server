'use strict'

var express = require('express');
var MeasureController = require('../controllers/measure');

var app = express();

// middleware
var mdAutenticacion = require('../middlewares/autentication');

var app = express.Router();

app.get('/:id', MeasureController.getMeasure);
app.get('/pacient/:pacientId', MeasureController.getMeasures);
app.post('/register', mdAutenticacion.verifyToken, MeasureController.registerMeasure);
app.delete('/:id', mdAutenticacion.verifyToken, MeasureController.deleteMeasure);
app.put('/update/:id', mdAutenticacion.verifyToken, MeasureController.updateMeasure);

module.exports = app;