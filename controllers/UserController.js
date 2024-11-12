const User = require('../models/userModel');

module.exports = class UserController {
    static async createUser(req, res) {
        const { nome, funcao, salario } = req.body;
        try {
            const nomeExistente = await User.findOne({ nome });
            if (nomeExistente) {
                return res.status(400).json({ error: 'Nome já existe' });
            }

            if (nome == funcao){
                return res.status(400).json({ error: 'Nome não pode ser mesmo que função'})
            }


            const user = new User({ nome, funcao, salario });
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
