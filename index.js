const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Conectar ao banco de dados
require('./configBd/db');

const app = express();

// Configurar middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));

// Importar as rotas
const userRoutes = require('./routes/userRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const loginRoutes = require('./routes/loginRoutes');

// Usar as rotas
app.use('/users', userRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/', loginRoutes);

// Configurar porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
