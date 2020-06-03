const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var notaSchema = new Schema({
    fecha: {type: DateTime, required: true},    
    texto: {type: String, required: true}
});

module.exports = mongoose.model('Nota', notaSchema);