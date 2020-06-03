const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Mensaje Freelance',
    });
});
app.post('/', (req, res) => {

});
app.put('/', (req, res) => {

});
app.delete('/', (req, res) => {

});

module.exports = app;
