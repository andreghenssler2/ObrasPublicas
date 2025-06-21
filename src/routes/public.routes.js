const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /public/obras/{id}:
 *   get:
 *     summary: Consultar dados públicos de uma obra
 *     tags: [Consulta Pública]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *     responses:
 *       200:
 *         description: Dados da obra e suas etapas
 */
router.get('/obras/:id', async (req, res) => {
  const obraId = parseInt(req.params.id);

  try {
    const obra = await prisma.obra.findUnique({
      where: { id: obraId },
      include: {
        etapas: { orderBy: { id: 'asc' } }
      }
    });

    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }

    return res.json({
      id: obra.id,
      nome: obra.nome,
      descricao: obra.descricao,
      bairro: obra.bairro,
      tipo: obra.tipo,
      status: obra.status,
      cronograma: obra.cronograma,
      empresaResponsavel: obra.empresaResponsavel,
      etapas: obra.etapas
    });
  } catch (err) {
    console.error('Erro na consulta pública:', err);
    return res.status(500).json({ error: 'Erro interno ao buscar obra' });
  }
});

/**
 * @swagger
 * /public/obras/bairro/{bairro}:
 *   get:
 *     summary: Listar obras por bairro
 *     tags: [Consulta Pública]
 *     parameters:
 *       - in: path
 *         name: localizacao
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do bairro
 *     responses:
 *       200:
 *         description: Lista de obras
 */
router.get('/obras/bairro/:bairro', async (req, res) => {
  const { bairro } = req.params;

  try {
    const obras = await prisma.obra.findMany({
      where: {
        localizacao: {
          contains: bairro,
          mode: 'insensitive'
        }
      },
      include: { etapas: true }
    });

    return res.json(obras);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar obras por bairro' });
  }
});

/**
 * @swagger
 * /public/obras/tipo/{tipo}:
 *   get:
 *     summary: Listar obras por tipo
 *     tags: [Consulta Pública]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: "Tipo da obra (ex: pavimentação, escola)"
 *     responses:
 *       200:
 *         description: Lista de obras
 */
router.get('/obras/tipo/:tipo', async (req, res) => {
  const { tipo } = req.params;

  try {
    const obras = await prisma.obra.findMany({
      where: {
        tipo: {
          contains: tipo,
          mode: 'insensitive'
        }
      },
      include: { etapas: true }
    });

    return res.json(obras);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar obras por tipo' });
  }
});
/**
 * @swagger
 * /public/obras:
 *   get:
 *     summary: Listar todas as obras públicas
 *     tags: [Consulta Pública]
 *     responses:
 *       200:
 *         description: Lista completa de obras
 */
router.get('/obras', async (req, res) => {
  try {
    const obras = await prisma.obra.findMany({
      orderBy: { criadoEm: 'desc' },
      include: { etapas: true }
    });

    return res.json(obras);
  } catch (error) {
    console.error('Erro ao listar obras:', error);
    return res.status(500).json({ error: 'Erro ao buscar obras' });
  }
});

/**
 * @swagger
 * /public/etapas/historico/{etapaId}:
 *   get:
 *     summary: Consultar histórico público de uma etapa
 *     tags: [Consulta Pública]
 *     parameters:
 *       - in: path
 *         name: etapaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da etapa
 *     responses:
 *       200:
 *         description: Histórico de alterações da etapa
 */
router.get('/etapas/historico/:etapaId', async (req, res) => {
  const etapaId = parseInt(req.params.etapaId);

  try {
    const historico = await prisma.etapaHistorico.findMany({
      where: { etapaId },
      orderBy: { alteradoEm: 'desc' }
    });

    if (!historico.length) {
      return res.status(404).json({ error: 'Histórico da etapa não encontrado' });
    }

    return res.json(historico);
  } catch (error) {
    console.error('Erro ao buscar histórico público da etapa:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar histórico da etapa' });
  }
});


module.exports = router;
