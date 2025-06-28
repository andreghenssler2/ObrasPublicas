const express = require('express');
const router = express.Router();
const { getObraPublicaPorId, listObrasPublicas } = require('../controllers/public.controller');

// Rota pública para consultar uma obra específica
router.get('/obras/:id', getObraPublicaPorId);

// Rota pública para listar todas as obras
router.get('/obras', listObrasPublicas);

module.exports = router;
