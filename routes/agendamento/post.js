const express = require('express');
const router = express.Router();
const Agendamento = require('../../models/Agendamentos');

router.post('/', async (req, res) => {
    const { date, status, pessoa } = req.body; // Desestruturação para pegar os dados

    if (!date || !status || !pessoa) {
        return res.status(422).json({ error: 'Data, status e pessoa são obrigatórios' });
    }

    try {
        // Verifique se a pessoa existe
        const pessoaEncontrada = await Pessoa.findById(pessoa);
        if (!pessoaEncontrada) {
            return res.status(422).json({ error: 'Pessoa não encontrada' });
        }

        const agendamento = new Agendamento({ date, status, pessoa });

        await agendamento.save();
        res.status(201).json({ message: 'Agendamento inserido no sistema com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
