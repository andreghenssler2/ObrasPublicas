/**
 * @swagger
 * tags:
 *   name: Etapas
 *   description: Rotas autenticadas para etapas
 */
const router = require('express').Router();
const { createEtapa, updateStatusEtapa,listEtapasByObra,historicoEtapasPorObra  } = require('../controllers/etapa.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/etapas:
 *   post:
 *     summary: Cadastrar nova etapa (requer login)
 *     tags: [Etapas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               descricao: { type: string }
 *               obraId: { type: integer }
 *     responses:
 *       201:
 *         description: Etapa criada
 */
router.post('/', auth, createEtapa);

/**
 * @swagger
 * /api/etapas/{id}/status:
 *   patch:
 *     summary: Atualizar status da etapa (requer login)
 *     tags: [Etapas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }
 *     responses:
 *       200:
 *         description: Status atualizado
 */
router.patch('/:id/status', auth, updateStatusEtapa);  

/**
 * @swagger
 * /api/etapas/obra/{obraId}:
 *   get:
 *     summary: Consultar histórico de etapas de uma obra (requer login)
 *     tags: [Etapas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: obraId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de etapas
 */
router.get('/obra/:obraId', auth, listEtapasByObra);
// router.get('/obra/:obraId/historico', auth, historicoEtapasPorObra);

module.exports = router;
