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

module.exports = {
  criarObra,
  listarObras,
};
