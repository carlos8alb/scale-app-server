'user strict'

var express = require('express');
var UserController = require('../controllers/user');

var app = express();

// middleware

var app = express.Router();

app.get('/', UserController.getUsers);
app.get('/:id', UserController.getUser);
app.post('/register', UserController.registerUser);
app.delete('/:id', UserController.deleteUser);
app.put('/update/:id', UserController.updateUser);

module.exports = app;