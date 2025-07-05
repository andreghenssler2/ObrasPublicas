const { Obra, Etapa } = require('../models');

// Consulta obra específica (com etapas)
exports.getObraPublicaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const obra = await Obra.findByPk(id, {
      attributes: ['id', 'nome', 'localizacao', 'empresaResponsavel', 'cronograma', 'orcamento', 'status', 'createdAt', 'updatedAt'],
      include: {
        model: Etapa,
        as: 'etapas',
        attributes: ['id', 'nome', 'descricao', 'status', 'createdAt', 'updatedAt']
      }
    });

    if (!obra) {
      return res.status(404).json({ mensagem: 'Obra não encontrada' });
    }
    if (obra.length === 0) {
      return res.status(404).json({ mensagem: 'Obra não encontrada' });
    }

    res.json(obra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao consultar obra' });
  }
};

// Lista todas as obras públicas
exports.listObrasPublicas = async (req, res) => {
  try {
    const obras = await Obra.findAll({
      attributes: ['id', 'nome', 'localizacao', 'status', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    });
    if (obras.length === 0) {
      return res.status(404).json({ mensagem: 'Não há obras encontradas' });
    }
    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar obras' });
  }
};
