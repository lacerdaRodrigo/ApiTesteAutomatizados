const express = require('express');
const cors = require('cors');
const app = express();
require('./configBd/db');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const userRoutes = require('./routes/UserRoutes');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
