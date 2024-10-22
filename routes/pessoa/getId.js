const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const pessoa = await Pessoa.findOne({ _id: id });
        if (!pessoa) {
            res.status(422).json({ message: 'O usuário não foi encontrado' });
            return;
        }
        res.status(200).json(pessoa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
