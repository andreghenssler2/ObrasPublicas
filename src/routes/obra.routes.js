/**
 * @swagger
 * tags:
 *   name: Obras
 *   description: Rotas autenticadas para obras
 */
const router = require('express').Router();
const { createObra, listObras,listObrasNaoFinalizadas,listObrasPorBairro } = require('../controllers/obra.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, createObra); // Cria obras

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
router.get('/', listObras);

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
router.get('/andamento', auth, listObrasNaoFinalizadas);
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
router.get('/bairro', auth, listObrasPorBairro);


module.exports = router;
