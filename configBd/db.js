// require('dotenv').config()
// const mongoose = require('mongoose');

// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;


// mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@api.hsggv.mongodb.net/?retryWrites=true&w=majority&appName=Api`)
//     .then(() => {
//         console.log('Conectamos ao MongoDB');
//     })
//     .catch((err) => console.log(err));

// module.exports = mongoose;


const mongoose = require('mongoose');
// const username = process.env.DB_USER;
// const password = process.env.DB_PASSWORD;
// const cluster = process.env.DB_CLUSTER;
// const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://lacerdaarodrigo:HH6yYxrdy1yLl6CA@api.hsggv.mongodb.net/?retryWrites=true&w=majority&appName=Api`;

mongoose.connect(uri)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

 