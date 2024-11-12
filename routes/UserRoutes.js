const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.createUser);
router.get('/', UserController.getUsers);
router.delete('/:nome', UserController.deleteUserNome)
router.patch('/update-name', UserController.updateUserNameById);

module.exports = router;
