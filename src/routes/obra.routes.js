const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obra.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', obraController.listarObras);
router.post('/', authMiddleware, obraController.criarObra);

module.exports = router;
