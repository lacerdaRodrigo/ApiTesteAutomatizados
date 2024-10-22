const express = require('express');
const router = express.Router();
const Pessoa = require('../../models/Pessoa');

router.get('/', async (req, res) => {

    try {
        const people = await Pessoa.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router;
 