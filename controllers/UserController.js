const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


module.exports = class UserController {
    //POST Criar Usuario do Sistema
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




    //POST Login do sistema com usuario criado
    static async login(req,res){
        const {email,password} = req.body

        if (!email) {
            return res.status(422).json({ error: 'Email é obrigatória.' });
        }
        if (!password) {
            return res.status(422).json({ error: 'Senha é obrigatória.' });
        }

        const user = await User.findOne({email:email})

        if (!user){
            return res.status(422).json({message: "Não há usuario cadastrado com este e-mail"})
        }

        //checar senha com banco de dados 
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(422).json({message: "Senha invalida"})
        }
        await createUserToken(user, req,res)
    }






    // GET Verificar login pelo tokem
    static async checkUser(req,res){
        let currentUser

        console.log(req.headers.authorization)

        if(req.headers.authorization){

            const token = getToken(req)
            const decoded = jwt.verify(token,'nossosecret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        }else{
            currentUser = null
        }

        res.status(200).send(currentUser)
    }




    // GET verificar login com ID
    static async getUserById(req,res){
        
        const id = req.params.id
        const user = await User.findById(id).select('-password')

        if(!user){
          return  res.status(422).json({message: 'Usuario não encontrado'})
        }

        res.status(200).json({user})
    }






    // PATH atualizar dados do Usuario
    static async editUser(req,res){
        return res.status(200).json({message: 'Deu certo update!'});
    }
    



};
