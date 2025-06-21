const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obra.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Obras
 *   description: Gerenciamento das obras públicas
 */

/**
 * @swagger
 * /api/obras:
 *   get:
 *     summary: Lista todas as obras (público)
 *     tags: [Obras]
 *     responses:
 *       200:
 *         description: Lista de obras
 */
router.get('/', obraController.listarObras);

/**
 * @swagger
 * /api/obras:
 *   post:
 *     summary: Cria uma nova obra (somente servidores autenticados)
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - localizacao
 *               - empresa
 *               - cronograma
 *               - orcamento
 *               - status
 *             properties:
 *               nome:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               empresa:
 *                 type: string
 *               cronograma:
 *                 type: string
 *               orcamento:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Obra criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, obraController.criarObra);

module.exports = router;
