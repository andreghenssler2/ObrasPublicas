const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obra.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const path = require('path');

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta para salvar os arquivos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.get('/', obraController.listarObras);
// upload.array() para múltiplos arquivos (ex: documentos e imagens)
router.post('/', authMiddleware, upload.array('arquivos', 10), obraController.criarObra);

module.exports = router;
