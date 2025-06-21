const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarObra(req, res) {
  const { nome, localizacao, empresa, cronograma, orcamento, status } = req.body;
  const servidorId = req.user.userId;

  if (!nome || !localizacao || !empresa || !cronograma || !orcamento || !status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const obra = await prisma.obra.create({
      data: {
        nome,
        localizacao,
        empresa,
        cronograma,
        orcamento: Number(orcamento),
        status,
        servidorId,
      }
    });

    res.status(201).json(obra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar obra' });
  }
}

async function listarObras(req, res) {
  try {
    const obras = await prisma.obra.findMany({
      include: {
        servidor: {
          select: { id: true, nome: true, email: true }
        }
      }
    });
    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar obras' });
  }
}
async function listarObrasPublicas(req, res) {
  try {
    const obras = await prisma.obra.findMany({
      include: {
        etapas: {
          select: { id: true, nome: true, status: true }
        },
        documentos: {
          select: { id: true, nome: true, url: true }
        }
      },
      orderBy: { criadoEm: 'desc' }
    });

    res.json(obras);
  } catch (error) {
    console.error('Erro ao listar obras públicas:', error);
    res.status(500).json({ error: 'Erro ao listar obras públicas' });
  }
}
async function consultarObrasPorFiltro(req, res) {
  try {
    const { bairro, status } = req.query;

    // Monta o filtro dinamicamente
    const where = {};
    if (bairro) {
      // filtro case insensitive por bairro (localizacao)
      where.localizacao = {
        contains: bairro,
        mode: 'insensitive'
      };
    }
    if (status) {
      where.status = status;
    }

    const obras = await prisma.obra.findMany({
      where,
      include: {
        etapas: true,
        documentos: true,
      },
      orderBy: { criadoEm: 'desc' }
    });

    res.json(obras);
  } catch (error) {
    console.error('Erro ao consultar obras por filtro:', error);
    res.status(500).json({ error: 'Erro ao consultar obras.' });
  }
}

module.exports = {
  listarObrasPublicas,
  criarObra,
  listarObras,
  consultarObrasPorFiltro,
};
