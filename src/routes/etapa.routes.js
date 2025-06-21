const express = require('express');
const router = express.Router();
const etapaController = require('../controllers/etapa.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Etapas
 *   description: Controle das etapas das obras
 */

/**
 * @swagger
 * /api/etapas:
 *   post:
 *     summary: Criar uma nova etapa para uma obra
 *     tags: [Etapas]
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
 *               - status
 *               - obraId
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Planejamento
 *               status:
 *                 type: string
 *                 example: Em andamento
 *               obraId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Etapa criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, etapaController.criarEtapa);

/**
 * @swagger
 * /api/etapas/{id}:
 *   put:
 *     summary: Atualizar uma etapa existente
 *     tags: [Etapas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
 *                 example: Concluído
 *     responses:
 *       200:
 *         description: Etapa atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
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
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da obra
 *     responses:
 *       200:
 *         description: Lista de etapas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   status:
 *                     type: string
 *       404:
 *         description: Obra não encontrada
 */
router.get('/obra/:obraId', etapaController.listarEtapasPorObra);

module.exports = router;
