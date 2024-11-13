const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

router.post('/agendamento', AgendamentoController.createAgendamento);
router.get('/', AgendamentoController.getAgendamento);

module.exports = router;