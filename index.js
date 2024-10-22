const express = require('express')
const app = express()
require('./configBd/db');


// Iniciar servidor (mova o app.listen para o arquivo principal)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// forma de ler JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// rotas da API
const pessoaRoutes = require('./routes/pessoa');  // Atualize o caminho aqui
app.use('/pessoa', pessoaRoutes);

const agendamentoRoutes = require('./routes/agendamento');  // Atualize o caminho aqui
app.use('/agendamento', agendamentoRoutes);





