const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, salary, phone,profession, approved } = req.body;
    const pessoaUpdate = { name, salary, phone,profession, approved };

    try {
        const updatepessoa = await Pessoa.updateOne({ _id: id }, pessoaUpdate);
        if (updatepessoa.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado' });
            return;
        }
        res.status(200).json(pessoaUpdate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;