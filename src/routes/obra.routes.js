const router = require('express').Router();
const { createObra, listObras,listObrasNaoFinalizadas,listObrasPorBairro } = require('../controllers/obra.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, createObra);
router.get('/', listObras);
router.get('/andamento', auth, listObrasNaoFinalizadas);
router.get('/bairro', auth, listObrasPorBairro);


module.exports = router;
