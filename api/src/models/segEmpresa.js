const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var seguimientoEmpresaSchema = new Schema({
    empresa: {type: Schema.Types.ObjectId , ref: 'Empresa', required: true},
    notas: {type: Schema.Types.ObjectId , ref: 'Nota', required: true}
});

module.exports = mongoose.model('SeguimientoEmpresa', seguimientoEmpresaSchema);