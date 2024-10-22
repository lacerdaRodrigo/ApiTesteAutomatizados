const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const pessoa = await Pessoa.findOne({ _id: id });
    
    if (!pessoa) {
        res.status(422).json({ message: 'O usuário não foi encontrado' });
        return;
    }
    
    try {
        await Pessoa.deleteOne({ _id: id });
        res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
