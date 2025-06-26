/**
 * @swagger
 * tags:
 *   name: Etapas
 *   description: Controle de etapas das obras, com histórico e conclusão automática da obra
 */

const express = require('express');
const router = express.Router();

const etapaController  = require('../controllers/etapa.controller');
const authMiddleware   = require('../middlewares/auth.middleware'); // proteger rotas (servidor)

/**
 * @swagger
 * /api/etapas:
 *   post:
 *     summary: Criar nova etapa para uma obra
 *     tags: [Etapas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, status, obraId]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Planejamento
 *               status:
 *                 type: string
 *                 example: planejamento
 *               obraId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Etapa criada com sucesso
 */
router.post('/', authMiddleware, etapaController.criarEtapa);

/**
 * @swagger
 * /api/etapas/{id}:
 *   put:
 *     summary: Atualizar etapa (gera histórico e pode concluir obra)
 *     tags: [Etapas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da etapa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Execução
 *               status:
 *                 type: string
 *                 example: finalizada
 *     responses:
 *       200:
 *         description: Etapa atualizada
 *       404:
 *         description: Etapa não encontrada
 */
router.put('/:id', authMiddleware, etapaController.atualizarEtapa);

/**
 * @swagger
 * /api/etapas/obra/{obraId}:
 *   get:
 *     summary: Listar etapas de uma obra
 *     tags: [Etapas]
 *     parameters:
 *       - in: path
 *         name: obraId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *     responses:
 *       200:
 *         description: Lista de etapas
 */
router.get('/obra/:obraId', etapaController.listarEtapasPorObra);

/**
 * @swagger
 * /api/etapas/historico/{etapaId}:
 *   get:
 *     summary: Histórico de alterações de uma etapa
 *     tags: [Etapas]
 *     parameters:
 *       - in: path
 *         name: etapaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da etapa
 *     responses:
 *       200:
 *         description: Histórico da etapa
 */
router.get('/historico/:etapaId', etapaController.listarHistoricoEtapa);

module.exports = router;
