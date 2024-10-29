const mongoose = require('mongoose');
const uri = 'mongodb+srv://lacerdaarodrigo:HH6yYxrdy1yLl6CA@api.hsggv.mongodb.net/?retryWrites=true&w=majority&appName=Api';

mongoose.connect(uri)
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

module.exports = mongoose;
