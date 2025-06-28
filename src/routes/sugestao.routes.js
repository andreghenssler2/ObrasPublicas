// src/routes/sugestao.routes.js
const router = require('express').Router();
const { createSugestao, listSugestoes } = require('../controllers/sugestao.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', createSugestao);  // público, sem auth
router.get('/listas', auth, listSugestoes);       // Protegido

module.exports = router;
