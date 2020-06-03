const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Mensaje Empresa',
    });
});

app.post('/', (req, res) => {

});

app.put('/', (req, res) => {
    
    var id = req.params.id;

    Model.findById(id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'error',
                message: 'Mensaje',
                errors: err
            });
        }

        if (!data) {
            res.status(500).json({
                status: 'error',
                message: 'No se encontro el ID',
                errors: { message: 'Error al buscar' }
            });
        }

        res.status(200).json({
            status: 'ok',
            message: 'Todo OK',
            data: data
        });

        var nombre = req.body.nombre;
        var web = req.body.web;
    });
});

app.delete('/', (req, res) => {

});

module.exports = app;
