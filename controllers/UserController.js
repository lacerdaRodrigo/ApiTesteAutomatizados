const express = require('express');
const User = require('../models/User');
const router = express.Router();

module.exports = class UserController {
    static async createUser(req, res) {
             
       const { nome, salario, telefone, profissional } = req.body;

        if (!nome) {
            return res.status(422).json({ error: 'O nome é obrigatório' });
        }
        if (!salario) {
            return res.status(422).json({ error: 'O salario é obrigatório' });
        }
        if (!telefone) {
            return res.status(422).json({ error: 'O telefone é obrigatório' });
        }
        
        if (!profissional) {
            return res.status(422).json({ error: 'O profissional é obrigatório' });
        }
    
        const nomeExistente = await User.findOne({ nome: nome })
        if(nomeExistente)
        {
           return res.status(422).json({message: "Pessoa já cadastrada"})
        }
    
    
        const user = new User({ nome, salario, telefone, profissional });
        try {
            await user.save();
            res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Adicione mais métodos conforme necessário
};