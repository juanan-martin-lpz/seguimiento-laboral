const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var frameworkSchema = new Schema({
    nombre: {type: String, required: true}
});

module.exports = mongoose.model('Framework', frameworkSchema);