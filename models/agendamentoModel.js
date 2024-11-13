const mongoose =  require('mongoose');
const {Schema} = mongoose;


const agendamentoSchema = new Schema({
    observacao:{type: String,require: true},
    status: {type: String,require: true},
    servico:{type: String,require: true}
})
const agendamento = mongoose.model('agendamento',agendamentoSchema);
module.exports = agendamento;