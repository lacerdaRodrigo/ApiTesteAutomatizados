const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/criarUsuario');

router.post('/logins', LoginController.createLogin);
//router.post('/login', LoginController.login);
// router.get('/login/login', LoginController.getLogin);
// router.delete('/login/:id', LoginController.deleteLogin);

module.exports = router;
