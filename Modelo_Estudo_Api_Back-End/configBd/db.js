const mongoose = require('mongoose');
const uri = 'mongodb+srv://lacerdaarodrigo:Pwd123@teste01.kokeq.mongodb.net/?retryWrites=true&w=majority&appName=TESTE01';

mongoose.connect(uri)
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

module.exports = mongoose;
