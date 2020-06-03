const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Nada que ver aqui'
    });
});


module.exports = app;