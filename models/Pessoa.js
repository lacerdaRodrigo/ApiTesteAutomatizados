const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    phone: Number,
    profession: String,
    approved: Boolean
});

const Pessoa = mongoose.model('Pessoa', pessoaSchema);
module.exports = Pessoa;
