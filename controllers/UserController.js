const User = require('../models/userModel');

module.exports = class UserController {
    static async createUser(req, res) {
        const { nome, telefone, email, dataNas } = req.body;


        if(!nome || !telefone || !email || !dataNas){
            return res.status(400).json({error: 'Todos os campos são obrigatorio'});
        }

        if(!/^\d+$/.test(telefone)){
            return res.status(400).json({error: 'Telefone de conter apenas números'});
        }

        if(!/\S+@\S+\.\S+/.test(email)){
            return res.status(400).json({error: 'Email Inválido.'});
        }

        const dataNascimento = new Date(dataNas);
        if(isNaN(dataNascimento) || dataNascimento > new Date()){
            return res.status(400).json({error: 'Data nascimento inválida'});
        }


        try {
            const nomeExistente = await User.findOne({ nome });
            if (nomeExistente) {
                return res.status(400).json({ error: 'Nome já existe' });
            }

            const user = new User({  nome, telefone, email, dataNas });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }   
    }

    static async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUserNome(req,res) {
        try{
            const user = await User.findOneAndDelete({ nome: req.params.nome});
            if (!user) {
                return res.status(404).json({ error : 'Usurio não encontrado'});
            }
            res.status(200).json({ message: 'Usuario deletado com sucesso'});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async updateUserNameById(req,res) {
        try{
           const currentName = req.body.currentName;
           const newName = req.body.newName;
           const updateUser = await User.findOneAndUpdate(
            { nome: currentName },
            { nome: newName },
            { new: true, runValidators: true }
           )
            if (!updateUser) {
                return res.status(404).json({ error: 'Usuario não encontrado'});
            }
            res.status(200).json(updateUser);
        }catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    
};
