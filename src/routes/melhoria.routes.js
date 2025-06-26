// module.exports = router;
const express = require('express');
const router = express.Router();
const melhoriaController = require('../controllers/melhoria.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Melhorias
 *   description: Registro de sugestões, elogios ou denúncias por cidadãos
 */

/**
 * @swagger
 * /api/melhorias:
 *   post:
 *     summary: Registra uma sugestão, denúncia ou elogio
 *     tags: [Melhorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mensagem, tipo]
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               mensagem:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [sugestao, denuncia, elogio]
 *               obraId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Mensagem registrada com sucesso
 */
// router.post('/', melhoriaController.registrarMelhoria);

/**
 * @swagger
 * /api/melhorias:
 *   get:
 *     summary: Lista todos os registros de melhorias
 *     tags: [Melhorias]
 *     responses:
 *       200:
 *         description: Lista de mensagens registradas
 */
router.get('/', melhoriaController.listarMelhorias);


// ── ROTAS PÚBLICAS ──────────────────────────────────────────────
router.post('/', melhoriaController.registrarMelhoria);
router.get('/',  melhoriaController.listarMelhorias);

// ── ROTA PROTEGIDA (somente servidores) ─────────────────────────
/**
 * @swagger
 * /api/melhorias/admin:
 *   get:
 *     summary: Lista todas as melhorias (acesso restrito a servidores)
 *     tags: [Melhorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de melhorias
 *       401:
 *         description: Não autorizado
 */
router.get('/admin', authMiddleware, melhoriaController.listarMelhoriasAdmin);

module.exports = router;
