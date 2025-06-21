const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obra.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Obras
 *   description: Gestão e consulta de obras públicas
 */

/**
 * @swagger
 * /api/obras/acompanhar:
 *   get:
 *     summary: Consulta pública do status e cronograma das obras
 *     tags: [Obras]
 *     responses:
 *       200:
 *         description: Lista de obras com detalhes para acompanhamento público
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Reforma da Escola Municipal
 *                   localizacao:
 *                     type: string
 *                     example: Bairro São João
 *                   empresa:
 *                     type: string
 *                     example: Construtora Alpha
 *                   cronograma:
 *                     type: string
 *                     example: Jun - Dez 2025
 *                   orcamento:
 *                     type: number
 *                     format: float
 *                     example: 450000
 *                   status:
 *                     type: string
 *                     example: Em execução
 *                   etapas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nome:
 *                           type: string
 *                           example: Planejamento
 *                         status:
 *                           type: string
 *                           example: Concluído
 *                   documentos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nome:
 *                           type: string
 *                           example: Contrato
 *                         url:
 *                           type: string
 *                           example: https://example.com/contrato.pdf
 *       500:
 *         description: Erro ao listar obras públicas
 */
router.get('/acompanhar', obraController.listarObrasPublicas);
router.get('/consultar', obraController.consultarObrasPorFiltro);

// Rotas privadas
router.get('/', authMiddleware, obraController.listarObras);
router.post('/', authMiddleware, obraController.criarObra);


module.exports = router;
