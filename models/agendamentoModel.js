const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  observacao: { type: String, required: true },
  status: { type: String, required: true },
  servico: { type: String, required: true },
  clienteNome: { type: String, required: true },
  data: { type: Date, required: true },
  horario: { type: String, required: true }
});

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);
module.exports = Agendamento;
