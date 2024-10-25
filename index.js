const express = require('express');
const app = express();
require('./configBd/db');

//json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas (Routes) da API
const UserRoutes = require('./routes/UserRoutes')
app.use('/pessoa', UserRoutes)


// Iniciar servidor mongoDB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


