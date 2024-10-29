const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    profissional: {
        type: String,
        required: true
    },
},
{timestamps: true} // atualizar hora e data da criação e edição 
);

const Pessoa = mongoose.model('Pessoa', pessoaSchema);
module.exports = Pessoa;
