const express = require('express');
const cors = require('cors');
const app = express();
require('./configBd/db');

app.use(express.json());
app.use(cors({ origin: '*' }));

const userRoutes = require('./routes/UserRoutes');
const AgendamentoRoutes = require('./routes/AgendamentoRoutes');
app.use('/', AgendamentoRoutes)
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// //teste
// const express = require('express');
// const mongoose = require('mongoose');
// const agendamentoRoutes = require('./routes/AgendamentoRoutes');
// const userRoutes = require('./routes/userRoutes'); // Assegure-se de incluir suas rotas de usuário

// const app = express();

// app.use(express.json());
// app.use(agendamentoRoutes);
// app.use(userRoutes);

// mongoose.connect('mongodb://localhost:27017/seubanco', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(5000, () => console.log('Servidor rodando na porta 5000')))
//   .catch(err => console.log(err));
