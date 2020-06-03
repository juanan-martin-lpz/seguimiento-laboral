const express = require('express');
const app = express();

const mongoose = require('mongoose');


const PORT = require('./config/config').PORT;
const DB = require('./config/config').DB;

// body parser
var bodyParser = require('body-parser');


//
var connection = mongoose.connection.openUri(DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    
    if (err) throw err;

    console.log('Establecida conexion con la base de datos');
});

// Declaramos rutas
const mainRoute = require('./routes/index');
const freelanceRoute = require('./routes/freelance');
const empresaRoute = require('./routes/empresa');

// Configuramos el middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', mainRoute);
app.use('/freelance',freelanceRoute);
app.use('/empresa', empresaRoute);



// Lanzamos el servidor
app.listen(3000, () => {
    console.log('Servidor ejecutandose en puerto ' + PORT);
});