const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Cidadão registra sugestão, denúncia ou elogio.
 */
async function registrarMelhoria(req, res) {
  const { nome, email, mensagem, tipo, obraId } = req.body;

  if (!mensagem || !tipo) {
    return res.status(400).json({ error: 'Mensagem e tipo são obrigatórios.' });
  }

  try {
    const melhoria = await prisma.melhoria.create({
      data: {
        nome,
        email,
        mensagem,
        tipo,
        obraId: obraId || null,
      }
    });

    res.status(201).json({ message: 'Mensagem registrada com sucesso', melhoria });
  } catch (error) {
    console.error('Erro ao registrar melhoria:', error);
    res.status(500).json({ error: 'Erro interno ao registrar a mensagem.' });
  }
}

/**
 * Lista pública — sem autenticação — retorna todas as melhorias.
 */
async function listarMelhorias(req, res) {
  try {
    const melhorias = await prisma.melhoria.findMany({
      include: {
        obra: { select: { id: true, nome: true } }
      },
      orderBy: { criadoEm: 'desc' }
    });

    res.json(melhorias);
  } catch (error) {
    console.error('Erro ao listar melhorias:', error);
    res.status(500).json({ error: 'Erro ao listar melhorias.' });
  }
}

/**
 * Lista protegida — para servidores — com filtro opcional por data.
 */
async function listarMelhoriasAdmin(req, res) {
  try {
    const { inicio, fim } = req.query;

    const where = {};
    if (inicio || fim) {
      where.criadoEm = {};
      if (inicio) where.criadoEm.gte = new Date(inicio);
      if (fim)    where.criadoEm.lte = new Date(fim);
    }

    const melhorias = await prisma.melhoria.findMany({
      where,
      include: {
        obra: { select: { id: true, nome: true } }
      },
      orderBy: { criadoEm: 'desc' }
    });

    res.json(melhorias);
  } catch (error) {
    console.error('Erro ao listar melhorias (admin):', error);
    res.status(500).json({ error: 'Erro ao listar melhorias.' });
  }
}

module.exports = {
  registrarMelhoria,
  listarMelhorias,
  listarMelhoriasAdmin,
};
