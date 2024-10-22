const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

router.post('/', async (req, res) => {
    const { name, salary, phone,profession, approved } = req.body;

    if (!name) {
        return res.status(422).json({ error: 'O nome é obrigatório' });
    }

    const pessoa = new Pessoa({ name, salary, phone,profession, approved });

    try {
        await pessoa.save();
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
