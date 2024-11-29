const createUserToken = require('../helpers/create-user-token');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, password, confirmpassword, phone } = req.body;

        if (!name) {
            return res.status(422).json({ error: 'Nome é obrigatório.' });
        }
        if (!email) {
            return res.status(422).json({ error: 'Email é obrigatória.' });
        }
        if (!password) {
            return res.status(422).json({ error: 'Senha é obrigatória.' });
        }
        if (!phone) {
            return res.status(422).json({ error: 'Telefone é obrigatório.' });
        }
        if (!confirmpassword) {
            return res.status(422).json({ error: 'Digite a senha igual a anterior' });
        }


        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais.' });
        }

        //ver se o usuario existe
        const userExists = await User.findOne({email:email})
        if (userExists){
            return res.status(422).json({message: "Por Favor , Utilize outro Email. esse email Já existe na nossa base"})
        }

        //Criptografar senha no banco
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
            
        } catch (error) {
            res.status(500).json({message: error})
        }

    }
};
