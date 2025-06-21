const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listarObras = async (req, res) => {
  try {
    const obras = await prisma.obra.findMany({
      include: { etapas: true } // inclui etapas no resultado
    });
    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar obras.' });
  }
};

exports.criarObra = async (req, res) => {
  const { titulo, descricao, bairro, status, dataInicio, dataFim } = req.body;

  try {
    const novaObra = await prisma.obra.create({
      data: {
        titulo,
        descricao,
        bairro,
        status,
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim)
      }
    });
    res.status(201).json(novaObra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar obra.' });
  }
};
