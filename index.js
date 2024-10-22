const express = require('express');
const app = express();
require('./configBd/db');

// Forma de ler JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas da API
const pessoaRoutes = require('./routes/pessoa');
app.use('/pessoa', pessoaRoutes);
const agendamentoRoutes = require('./routes/agendamento');
app.use('/agendamento', agendamentoRoutes);

// Iniciar servidor mongoDB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


