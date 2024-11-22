
const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

router.post('/agendamentos', AgendamentoController.createAgendamento);
router.get('/agendamentos', AgendamentoController.getAgendamentos);
router.put('/agendamentos/:id', AgendamentoController.updateAgendamento);
router.delete('/agendamentos/:id', AgendamentoController.deleteAgendamento);

module.exports = router;
