'use strict'

var express = require('express');
var FileController = require('../controllers/file');
const fileUpload = require('express-fileupload');

var app = express();

// Define to get the files


// middleware
var mdAutenticacion = require('../middlewares/autentication');

var app = express.Router();
app.use(fileUpload());

app.get('/:destination/:id', mdAutenticacion.verifyToken, FileController.get);
app.post('/:destination/:id', mdAutenticacion.verifyToken, FileController.upload);
// app.delete('/:id', mdAutenticacion.verifyToken, UploadController.deleteFile);
// app.put('/update-file/:id', mdAutenticacion.verifyToken, UploadController.updateFile);

module.exports = app;