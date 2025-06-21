const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Criar etapa para uma obra (somente admin/servidor)
 */
async function criarEtapa(req, res) {
  const { nome, status, obraId } = req.body;

  if (!nome || !status || !obraId) {
    return res.status(400).json({ error: 'nome, status e obraId são obrigatórios.' });
  }

  try {
    // Verifica se a obra existe
    const obra = await prisma.obra.findUnique({ where: { id: obraId } });
    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada.' });
    }

    const etapa = await prisma.etapa.create({
      data: { nome, status, obraId }
    });

    res.status(201).json({ message: 'Etapa criada com sucesso', etapa });
  } catch (error) {
    console.error('Erro ao criar etapa:', error);
    res.status(500).json({ error: 'Erro ao criar etapa.' });
  }
}

/**
 * Atualizar status de uma etapa (somente admin/servidor)
 */
async function atualizarEtapa(req, res) {
  const { id } = req.params;
  const { nome, status } = req.body;

  try {
    const etapaExistente = await prisma.etapa.findUnique({ where: { id: Number(id) } });
    if (!etapaExistente) {
      return res.status(404).json({ error: 'Etapa não encontrada.' });
    }

    const etapaAtualizada = await prisma.etapa.update({
      where: { id: Number(id) },
      data: {
        nome: nome ?? etapaExistente.nome,
        status: status ?? etapaExistente.status
      }
    });

    res.json({ message: 'Etapa atualizada com sucesso', etapa: etapaAtualizada });
  } catch (error) {
    console.error('Erro ao atualizar etapa:', error);
    res.status(500).json({ error: 'Erro ao atualizar etapa.' });
  }
}

/**
 * Listar etapas de uma obra
 */
async function listarEtapasPorObra(req, res) {
  const { obraId } = req.params;

  try {
    const etapas = await prisma.etapa.findMany({
      where: { obraId: Number(obraId) },
      orderBy: { id: 'asc' }
    });

    res.json(etapas);
  } catch (error) {
    console.error('Erro ao listar etapas:', error);
    res.status(500).json({ error: 'Erro ao listar etapas.' });
  }
}

module.exports = {
  criarEtapa,
  atualizarEtapa,
  listarEtapasPorObra,
};
