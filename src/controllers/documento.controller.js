const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

async function uploadDocumento(req, res) {
  const { obraId } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo não enviado.' });
  }

  try {
    // Verifica se obra existe
    const obra = await prisma.obra.findUnique({
      where: { id: Number(obraId) },
    });
    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada.' });
    }

    // Salva registro no banco
    const documento = await prisma.documento.create({
      data: {
        nome: req.file.originalname,
        url: `/uploads/${req.file.filename}`, // ou URL pública se usar CDN
        obraId: Number(obraId),
      },
    });

    res.status(201).json({ message: 'Arquivo enviado com sucesso.', documento });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro ao salvar documento.' });
  }
}

module.exports = {
  uploadDocumento,
};
