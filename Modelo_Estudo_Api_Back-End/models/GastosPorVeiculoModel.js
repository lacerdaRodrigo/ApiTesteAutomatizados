const mongoose = require('mongoose');
const { Schema } = mongoose;

const GastosPorVeiculoSchema = new Schema({
    tipoVeiculo: { type: String, required: true },
    mes: { type: Date, required: true }, // Se quiser usar Data, pode usar Date em vez de Number
    combustivel: { type: Number, required: true },
    manutencao: { type: Number, required: true },
    seguro: { type: Number, required: true },
    outros: { type: Number, required: true },
    total: { type: Number, required: true }
});


const GastosPorVeiculo = mongoose.model('GastosPorVeiculo', GastosPorVeiculoSchema);
module.exports = GastosPorVeiculo;
