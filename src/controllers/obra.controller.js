const { Obra, Etapa } = require('../models');
const { Op, fn, col, where: sequelizeWhere  } = require('sequelize');


exports.createObra = async (req, res) => {
  try {
    const { nome, localizacao, empresaResponsavel, cronograma, orcamento, status } = req.body;

    if (!nome || !localizacao) {
      return res.status(400).json({ mensagem: 'Nome e localização são obrigatórios' });
    }

    const novaObra = await Obra.create({ nome, localizacao, empresaResponsavel, cronograma, orcamento, status });
    res.status(201).json(novaObra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar obra', erro: error.message });
  }
};


exports.listObras = async (req, res) => { // Lista Obra
  const obras = await Obra.findAll({ include: 'etapas' });
  if (obras.length === 0) {
      return res.status(404).json({ mensagem: 'Não há obras encontradas' });
    }
  res.json(obras);
};

exports.listObrasNaoFinalizadas = async (req, res) => { // Lista todas as obras que nao estao finalizado
  try {
    const obras = await Obra.findAll({
      where: {
        status: { [Op.ne]: 'FINALIZADO' }
      }
    });
    if (obras.length === 0) {
      return res.status(404).json({ mensagem: 'Não há obras encontradas' });
    }
    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar obras não finalizadas' });
  }
};

// Listar obras por bairro (filtro opcional)
exports.listObrasPorBairro = async (req, res) => {
  try {
    const { bairro } = req.query;
    let where = {};

    if (bairro) {
      const bairroLower = bairro.toLowerCase();
      where.localizacao = sequelizeWhere(fn('LOWER', col('localizacao')), {
        [Op.like]: `%${bairroLower}%`
      });
    }

    const obras = await Obra.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    if (obras.length === 0) {
      return res.status(404).json({ mensagem: 'Não há obras encontradas' });
    }

    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar obras por bairro' });
  }
};


exports.finalizarObra = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca a obra pelo ID
    const obra = await Obra.findByPk(id);

    if (!obra) {
      return res.status(404).json({ mensagem: 'Obra não encontrada' });
    }

    // Atualiza o status para FINALIZADA
    obra.status = 'FINALIZADA';
    await obra.save();
    if (obra.length === 0) {
      return res.status(404).json({ mensagem: 'Não foi possivel Salvar' });
    }

    res.json({ mensagem: 'Obra finalizada com sucesso', obra });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao finalizar a obra' });
  }
};
