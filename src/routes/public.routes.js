/**
 * @swagger
 * tags:
 *   name: Obras Públicas
 *   description: Consultas públicas de obras
 */

const express = require('express');
const router = express.Router();
const { getObraPublicaPorId, listObrasPublicas } = require('../controllers/public.controller');


/**
 * @swagger
 * /api/public/obras:
 *   get:
 *     summary: Lista todas as obras públicas
 *     tags: [Obras Públicas]
 *     responses:
 *       200:
 *         description: Lista de obras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
// Rota pública para consultar uma obra específica
router.get('/obras', listObrasPublicas);

/**
 * @swagger
 * /api/public/obras/{id}:
 *   get:
 *     summary: Consulta detalhes de uma obra específica
 *     tags: [Obras Públicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da obra
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da obra
 *       404:
 *         description: Obra não encontrada
 */
// Rota pública para listar todas as obras
router.get('/obras/:id', getObraPublicaPorId);

module.exports = router;
