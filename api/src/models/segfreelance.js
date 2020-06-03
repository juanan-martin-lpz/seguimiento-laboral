const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var seguimientoFreelanceSchema = new Schema({
    freelance: {type: Schema.Types.ObjectId , ref: 'Freelance', required: true},
    notas: {type: Schema.Types.ObjectId , ref: 'Nota', required: true}

});

module.exports = mongoose.model('SeguimientoFreelance', seguimientoFreelanceSchema);