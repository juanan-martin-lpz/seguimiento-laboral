const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var lenguajeSchema = new Schema({
    nombre: {type: String, required: true},
    frameworks: {type: Schema.Types.ObjectId , ref: 'Framework', required: false}
});

module.exports = mongoose.model('Lenguaje', lenguajeSchema);