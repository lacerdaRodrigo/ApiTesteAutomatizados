const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token')
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


module.exports = class UserController {
    //POST Criar Usuario do Sistema
    static async register(req, res) {
        const { name, email, password, confirmpassword, phone } = req.body;

        if (!name) {
            return res.status(422).json({ message: 'Nome é obrigatório.' });
        }

        //Validar email
        const validaEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        if (!email) {
            return res.status(422).json({ message: 'Email é obrigatório.' });
        } else if (!validaEmail(email)) {
            return res.status(422).json({ message: 'Email inválido. Certifique-se de que ele contenha "@" e ".com".' });
        }


        //Validar Senha
        const validarPassword = (password) =>{
            const regex = /^(?=.*[A-Z])(?=.*\d).+$/
            return regex.test(password)
        }
        if (!password) {
            return res.status(422).json({ message: 'Senha é obrigatória.' });
        }else if (!validarPassword(password)){
            return res.status(422).json({ message: 'Senha deve conter pelo menos uma letra maiúscula e um número.' });
        }

        if (!confirmpassword) {
            return res.status(422).json({ message: 'Digite a senha igual a anterior.' });
        }

        //validar telefone
        const validaPhone = (phone) =>{
            const regex = /^\d{9}$/;
            return regex.test(phone)
        }
        if (!phone) {
            return res.status(422).json({ message: 'Telefone é obrigatório.' });
        }else if(!validaPhone(phone)){
            return res.status(422).json({message: 'Telefone deve ter exatamente 9 dígitos.'})
        }

        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais.' });
        }


        //ver se o usuario existe
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(422).json({ message: "Por Favor , Utilize outro Email. esse email Já existe na nossa base" })
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
            res.status(500).json({ message: error })
        }

    }




    //POST Login do sistema com usuario criado
    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({ error: 'Email é obrigatória.' });
        }
        if (!password) {
            return res.status(422).json({ error: 'Senha é obrigatória.' });
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).json({ message: "Não há usuario cadastrado com este e-mail" })
        }

        //checar senha com banco de dados 
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({ message: "Senha invalida" })
        }
        await createUserToken(user, req, res)
    }






    // GET Verificar login pelo tokem
    static async checkUser(req, res) {
        let currentUser;
    
        console.log(req.headers.authorization);
    
        if (req.headers.authorization) {
            try {
                const token = getToken(req);
                const decoded = jwt.verify(token, 'nossosecret');
    
                currentUser = await User.findById(decoded.id);
                currentUser.password = undefined;
    
                res.status(200).send(currentUser);
            } catch (error) {
                return res.status(401).json({ message: 'Token inválido ou não autorizado.' });
            }
        } else {
            currentUser = null;
            res.status(200).send(currentUser);
        }
    }
    




    // GET verificar login com ID
    static async getUserById(req, res) {

        const id = req.params.id
        const user = await User.findById(id).select('-password')

        if (!user) {
            return res.status(422).json({ message: 'Usuario não encontrado' })
        }

        res.status(200).json({ user })
    }






    // PATH atualizar dados do Usuario
    static async editUser(req, res) {
        const id = req.params.id;

        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, email, password, confirmpassword, phone } = req.body;

        //validação
        if (!name) {
            return res.status(422).json({ error: 'Nome é obrigatório.' });
        }
        if (!email) {
            return res.status(422).json({ error: 'Email é obrigatória.' });
        }

        //Checar se o Usuario não esta usando mesmo email que ja esta cadastrado no sistema
        const userExists = await User.findOne({ email: email })
        if (!user.email !== email && userExists) {
            return res.status(422).json({ message: 'Utilize outro email , esse ja esta em nossa base de dados' })
        }
        user.email = email

        if (!phone) {
            return res.status(422).json({ error: 'Telefone é obrigatório.' });
        }
        user.phone = phone;

        if (password != confirmpassword) {
            return res.status(422).json({ message: 'As Senhas não são iguais' })
        } else if (password === confirmpassword && password != null) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            const updateUser = await User.findByIdAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true }
            )

            return res.status(200).json({ message: 'Usuario atualizado com sucesso!' })

        } catch (error) {

            return res.status(500).json({ message: error })
        }



    }





    //GET pegar todos os usuarios cadastrados no sistema
    static async getUser(req, res) {

        const user = await User.find()

        try {
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Não encontramos ninguem cadastrado' });
        }


    }







    //DELETAR usuario
    static async deleteUser(req, res) {

        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario não encontrado.' });
            }
            res.status(200).json({ message: 'Usuario deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: 'error.message' });
        }
    }




};
