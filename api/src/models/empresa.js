const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var empresaSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: false},
    telefono: {type: String, required: false},
    linkendin: {type: String, required: false},
    twitter: {type: String, required: false},
    facebook: {type: String, required: false},
    web: {type: String, required: false},
    notas: {type: Schema.Types.ObjectId , ref: Nota, required: false},
    seguimientos: {type: Schema.Types.ObjectId , ref: 'SeguimientoEmpresa', required: false},
    contactos: {type: Schema.Types.ObjectId , ref: 'Contacto', required: false}
});

module.exports = mongoose.model('Empresa', empresaSchema);