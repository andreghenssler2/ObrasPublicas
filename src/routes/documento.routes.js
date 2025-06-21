const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const documentoController = require('../controllers/documento.controller');

router.post(
  '/upload/:obraId',
  authMiddleware,
  upload.single('arquivo'),
  documentoController.uploadDocumento
);

module.exports = router;
