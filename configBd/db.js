require('dotenv').config()
const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@api.hsggv.mongodb.net/?retryWrites=true&w=majority&appName=Api`)
    .then(() => {
        console.log('Conectamos ao MongoDB');
    })
    .catch((err) => console.log(err));

module.exports = mongoose;
