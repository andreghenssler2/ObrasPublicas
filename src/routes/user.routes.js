/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas de autenticação
 */

const router = require('express').Router();
const { createUser } = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               email: { type: string }
 *               senha: { type: string }
 *     responses:
 *       201:
 *         description: Usuário registrado
 */
router.post('/', createUser);

module.exports = router;
