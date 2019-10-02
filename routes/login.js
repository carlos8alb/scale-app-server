'user strict'

var express = require('express');
var LoginController = require('../controllers/login');

var app = express();

// middleware

var app = express.Router();

app.post('/', LoginController.login);
// app.get('/renewtoken/:id', LoginController.renewToken);

module.exports = app;