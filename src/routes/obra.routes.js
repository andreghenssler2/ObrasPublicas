/**
 * @swagger
 * tags:
 *   name: Obras
 *   description: Rotas autenticadas para obras
 */
const router = require('express').Router();
const { createObra, listObras,listObrasNaoFinalizadas,listObrasPorBairro } = require('../controllers/obra.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Obra:
 *       type: object
 *       required:
 *         - nome
 *         - localizacao
 *         - empresaResponsavel
 *         - cronograma
 *         - orcamento
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *           description: Nome da obra
 *         localizacao:
 *           type: string
 *           description: Localização da obra
 *         empresaResponsavel:
 *           type: string
 *           description: Empresa responsável
 *         cronograma:
 *           type: string
 *           description: Cronograma previsto
 *         orcamento:
 *           type: number
 *           format: float
 *           description: Orçamento da obra
 *         status:
 *           type: string
 *           enum: [PLANEJAMENTO, EXECUCAO, FINALIZADA]
 *           description: Status atual da obra
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /api/obras:
 *   post:
 *     summary: Cadastrar uma nova obra
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Obra'
 *     responses:
 *       201:
 *         description: Obra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Obra'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
router.post('/', auth, createObra); // Cria obras, usuario altenticado

/**
 * @swagger
 * /api/obras:
 *   get:
 *     summary: Lista todas as obras (requer login)
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras
 */
router.get('/', listObras); // lista pbras

/**
 * @swagger
 * /api/obras/andamento:
 *   get:
 *     summary: Lista obras não finalizadas (requer login)
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras em andamento
 */
router.get('/andamento', auth, listObrasNaoFinalizadas); // lista obras em andamento, somente usuario autenticado
/**
 * @swagger
 * /api/obras/bairro:
 *   get:
 *     summary: Lista obras por bairro (requer login)
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bairro
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de obras do bairro
 */
router.get('/bairro', auth, listObrasPorBairro); // Lista obras por bairro, somente usuario autenticado


module.exports = router;
