'use strict'

var express = require('express');
var UploadController = require('../controllers/upload');
const fileUpload = require('express-fileupload');

var app = express();

// Define to get the files


// middleware
var mdAutenticacion = require('../middlewares/autentication');

var app = express.Router();
app.use(fileUpload());

app.post('/:destination/:id', mdAutenticacion.verifyToken, UploadController.saveFile);
// app.get('/:id', UploadController.getFile);
// app.delete('/:id', mdAutenticacion.verifyToken, UploadController.deleteFile);
// app.put('/update-file/:id', mdAutenticacion.verifyToken, UploadController.updateFile);

module.exports = app;