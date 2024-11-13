const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dataNas: {
        type: Number,
        required: true
    }
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;
