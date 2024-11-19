const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

router.post('/agendamento', AgendamentoController.createAgendamento);
router.get('/', AgendamentoController.getAgendamento);
router.delete('/:servico', AgendamentoController.deleteUserAgendamento);

module.exports = router;