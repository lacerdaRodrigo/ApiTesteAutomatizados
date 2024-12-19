const express = require('express');
const router = express.Router();
const GastosPorVeiculoController = require('../controllers/GastosPorVeiculoController');

router.post('/gastosporveiculo', GastosPorVeiculoController.PostGastosPorVeiculo);
//router.get('',GastosPorVeiculoController.getGastosPorVeiculo)

module.exports = router;