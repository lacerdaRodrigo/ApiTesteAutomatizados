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
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Api`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));
