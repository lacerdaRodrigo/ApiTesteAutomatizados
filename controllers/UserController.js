const jwt = require('jsonwebtoken');
const Login = require('../models/loginModel');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-login-token')

module.exports = class LoginController {
  static async createLogin(req, res) {
    const { usuario, senha, confirmaSenha, email, telefone } = req.body;

    if (!usuario) {
      return res.status(422).json({ error: 'Usuário é obrigatório.' });
    }
    if (!senha) {
      return res.status(422).json({ error: 'Senha é obrigatória.' });
    }
    if (!confirmaSenha) {
      return res.status(422).json({ error: 'A confirmação de senha é obrigatória.' });
    }
    if (!email) {
      return res.status(422).json({ error: 'E-mail é obrigatório.' });
    }
    if (!telefone) {
      return res.status(422).json({ error: 'Telefone é obrigatório.' });
    }

    if (senha !== confirmaSenha) {
      return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais.' });
    }

    const loginExistente = await Login.findOne({ email });

    if (loginExistente) {
      return res.status(422).json({
        message: 'Por favor, utilize outro e-mail.'
      });
    }

    // Criar Senha
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criar Login
    const login = new Login({
      usuario,
      senha: senhaHash,
      email,
      telefone
    });

    try {
      const novoLogin = await login.save();

      await createUserToken(novoLogin, req, res)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
