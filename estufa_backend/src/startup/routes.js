const express = require('express');
const person = require('../routes/person');
const sensores = require('../routes/sensores');
const acionadores = require('../routes/acionadores');

// localhosts:8080 / api/person
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/person', person);
    app.use('/api/sensores', sensores);
    app.use('/api/acionadores', acionadores);
}



