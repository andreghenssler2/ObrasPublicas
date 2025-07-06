/**
 * @swagger
 * tags:
 *   name: Obras
 *   description: Rotas autenticadas para obras
 */
const router = require('express').Router();
const { createObra, listObras,listObrasNaoFinalizadas,listObrasPorBairro,finalizarObra } = require('../controllers/obra.controller');
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

/**
 * @swagger
 * /api/obras/{id}/finalizar:
 *   patch:
 *     summary: Finalizar uma obra
 *     description: Atualiza o status da obra para FINALIZADA.
 *     tags:
 *       - Obras
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra a ser finalizada
 *     responses:
 *       200:
 *         description: Obra finalizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Obra finalizada com sucesso
 *                 obra:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     localizacao:
 *                       type: string
 *                     empresaResponsavel:
 *                       type: string
 *                     cronograma:
 *                       type: string
 *                     orcamento:
 *                       type: number
 *                     status:
 *                       type: string
 *                       example: FINALIZADA
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       404:
 *         description: Obra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Obra não encontrada
 *       500:
 *         description: Erro ao finalizar a obra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Erro ao finalizar a obra
 */
router.patch('/:id/finalizar', auth, finalizarObra);

module.exports = router;
