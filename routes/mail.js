'use strict'

var express = require('express');
var MailController = require('../controllers/mail');

var app = express();

var app = express.Router();

app.post('/send', MailController.send);

module.exports = app;