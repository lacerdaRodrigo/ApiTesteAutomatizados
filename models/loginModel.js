const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const loginSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true }
});

// Middleware para hash da senha antes de salvar
loginSchema.pre('save', async function (next) {
  if (this.isModified('senha') || this.isNew) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

// Método para comparar senha durante o login
loginSchema.methods.comparePassword = function (senha, callback) {
  bcrypt.compare(senha, this.senha, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const Login = mongoose.model('Login', loginSchema);
module.exports = Login;
