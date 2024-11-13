const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    funcao: {
        type: String,
        required: true
    },
    salario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    empresa: {
        type: String,
        required: true
    }
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;
