// src/controllers/etapa.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Cria uma nova etapa para uma obra.
 * Somente servidores autenticados (admin/servidor) devem acessar esta rota.
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

    return res.status(201).json({ message: 'Etapa criada com sucesso', etapa });
  } catch (error) {
    console.error('Erro ao criar etapa:', error);
    return res.status(500).json({ error: 'Erro ao criar etapa.' });
  }
}

/**
 * Atualiza o nome e/ou status de uma etapa.
 * 1. Registra o estado anterior da etapa em EtapaHistorico.
 * 2. Atualiza a etapa.
 * 3. Se o status passou para "finalizada", verifica se TODAS as etapas da obra
 *    também estão finalizadas. Caso afirmativo, marca a Obra como "concluída".
 */
async function atualizarEtapa(req, res) {
  const etapaId = parseInt(req.params.id);
  const { nome, status } = req.body;

  try {
    const etapaAtual = await prisma.etapa.findUnique({ where: { id: etapaId } });
    if (!etapaAtual) {
      return res.status(404).json({ error: 'Etapa não encontrada.' });
    }

    // Salva histórico ANTES da alteração
    await prisma.etapaHistorico.create({
      data: {
        etapaId: etapaAtual.id,
        nome: etapaAtual.nome,
        status: etapaAtual.status,
      }
    });

    // Atualiza a etapa propriamente dita
    const etapaAtualizada = await prisma.etapa.update({
      where: { id: etapaId },
      data: {
        nome: nome ?? etapaAtual.nome,
        status: status ?? etapaAtual.status,
      }
    });

    // Se virou "finalizada", verifica todas as etapas da obra
    const novoStatus = status ?? etapaAtual.status;
    if (novoStatus.toLowerCase() === 'finalizada') {
      const etapasDaObra = await prisma.etapa.findMany({ where: { obraId: etapaAtual.obraId } });
      const todasFinalizadas = etapasDaObra.every(e => e.status.toLowerCase() === 'finalizada');
      if (todasFinalizadas) {
        await prisma.obra.update({ where: { id: etapaAtual.obraId }, data: { status: 'concluída' } });
      }
    }

    return res.json({ message: 'Etapa atualizada', etapa: etapaAtualizada });
  } catch (error) {
    console.error('Erro ao atualizar etapa:', error);
    return res.status(500).json({ error: 'Erro ao atualizar etapa.' });
  }
}

/**
 * Lista todas as etapas de uma obra específica.
 */
async function listarEtapasPorObra(req, res) {
  const obraId = parseInt(req.params.obraId);
  try {
    const etapas = await prisma.etapa.findMany({
      where: { obraId },
      orderBy: { id: 'asc' }
    });
    return res.json(etapas);
  } catch (error) {
    console.error('Erro ao listar etapas:', error);
    return res.status(500).json({ error: 'Erro ao listar etapas.' });
  }
}

/**
 * Lista o histórico de alterações de uma etapa.
 */
async function listarHistoricoEtapa(req, res) {
  const etapaId = parseInt(req.params.etapaId);
  try {
    const historico = await prisma.etapaHistorico.findMany({
      where: { etapaId },
      orderBy: { alteradoEm: 'desc' }
    });
    return res.json(historico);
  } catch (error) {
    console.error('Erro ao listar histórico da etapa:', error);
    return res.status(500).json({ error: 'Erro ao listar histórico.' });
  }
}

module.exports = {
  criarEtapa,
  atualizarEtapa,
  listarEtapasPorObra,
  listarHistoricoEtapa,
};
