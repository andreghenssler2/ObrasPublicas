/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas de autenticação
 */
const router = require('express').Router();
const { login } = require('../controllers/auth.controller');
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               senha: { type: string }
 *     responses:
 *       200:
 *         description: Token JWT
 */
router.post('/login', login);

module.exports = router;
