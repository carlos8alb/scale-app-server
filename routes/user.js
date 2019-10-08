'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var app = express();

// middleware
var mdAutenticacion = require('../middlewares/autentication');

var app = express.Router();

app.get('/', UserController.getUsers);
app.get('/:id', UserController.getUser);
app.post('/register', UserController.registerUser);
app.delete('/:id', mdAutenticacion.verifyToken, UserController.deleteUser);
app.put('/update/:id', mdAutenticacion.verifyToken, UserController.updateUser);

module.exports = app;