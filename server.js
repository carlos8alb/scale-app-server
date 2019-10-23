'use strict'

// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('./config/config');

// Init vars
var app = express()

//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Conection DB
mongoose.connection.openUri(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
    (err, res) => {
        if (err) throw err;
        console.log('Data Base: \x1b[32m%s\x1b[0m', 'online');

        // Escuchar peticiones
        app.listen(process.env.PORT, () => {
            console.log(`Express server port ${ process.env.PORT }: \x1b[32m%s\x1b[0m`, 'online');
        });
    }
);

// Load Routes
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');
var pacientRoutes = require('./routes/pacient');
var antecedentRoutes = require('./routes/antecedent');
var measureRoutes = require('./routes/measure');
var mailRoutes = require('./routes/mail');
var uploadRoutes = require('./routes/upload');

// Base Routes
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/pacient', pacientRoutes);
app.use('/antecedent', antecedentRoutes);
app.use('/measure', measureRoutes);
app.use('/mail', mailRoutes);
app.use('/upload', uploadRoutes);

module.exports = app;