const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var contactoSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: false},
    telefono: {type: String, required: false},
    linkendin: {type: String, required: false},
    twitter: {type: String, required: false},
    facebook: {type: String, required: false},
    web: {type: String, required: false},   
    notas: {type: Schema.Types.ObjectId , ref: Nota, required: false}
});

module.exports = mongoose.model('Contacto', contactoSchema);