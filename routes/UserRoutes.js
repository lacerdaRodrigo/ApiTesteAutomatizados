const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); // Certifique-se de que o caminho está correto

router.post('/register', UserController.createUser);

module.exports = router;
