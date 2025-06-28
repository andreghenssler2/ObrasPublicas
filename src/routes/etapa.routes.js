const router = require('express').Router();
const { createEtapa, updateStatusEtapa,listEtapasByObra,historicoEtapasPorObra  } = require('../controllers/etapa.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, createEtapa);
router.patch('/:id/status', auth, updateStatusEtapa);  
router.get('/obra/:obraId', auth, listEtapasByObra);
// router.get('/obra/:obraId/historico', auth, historicoEtapasPorObra);

module.exports = router;
