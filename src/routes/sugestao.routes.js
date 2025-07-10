// src/routes/sugestao.routes.js
const router = require('express').Router();
const { createSugestao, listSugestoes } = require('../controllers/sugestao.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', createSugestao);  // público, sem auth
router.get('/listas', auth, listSugestoes);       // Protegido

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Sugestoes
 *   description: Rotas públicas para sugestões ou denúncias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sugestao:
 *       type: object
 *       required:
 *         - mensagem
 *         - tipo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *           description: Nome do cidadão (opcional)
 *         email:
 *           type: string
 *           description: Email do cidadão (opcional)
 *         mensagem:
 *           type: string
 *           description: Mensagem da sugestão ou denúncia
 *         tipo:
 *           type: string
 *           enum: [SUGESTAO, DENUNCIA]
 *           description: Tipo da sugestão
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/sugestoes/listas:
 *   get:
 *     summary: Lista todas as sugestões ou denúncias
 *     tags: [Sugestoes]
 *     responses:
 *       200:
 *         description: Lista de sugestões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sugestao'
 */

/**
 * @swagger
 * /api/sugestoes:
 *   post:
 *     summary: Enviar uma nova sugestão ou denúncia
 *     tags: [Sugestoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sugestao'
 *     responses:
 *       201:
 *         description: Sugestão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sugestao'
 *       400:
 *         description: Dados inválidos (mensagem ou tipo faltando)
 *       500:
 *         description: Erro interno
 */
