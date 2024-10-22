const mongoose = require('mongoose'); 

const agendamentoSchema = new mongoose.Schema({

    date: { type: Date, required: true },
    status: { type: String, required: true },
    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa', required: true } // Referencia a modelo Pessoa

})

const Agendamento = mongoose.model('Agendamento', agendamentoSchema)
module.exports = Agendamento;



//fuja da maledicencia julgamento

//thiago 4 11-12
//Matheus 6 
//thiago 3 5 - 6 
