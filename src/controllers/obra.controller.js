const { Obra, Etapa } = require('../models');
const { Op, fn, col, where: sequelizeWhere  } = require('sequelize');

exports.createObra = async (req, res) => {
  const obra = await Obra.create(req.body);
  res.status(201).json(obra);
};

exports.listObras = async (req, res) => {
  const obras = await Obra.findAll({ include: 'etapas' });
  res.json(obras);
};

exports.listObrasNaoFinalizadas = async (req, res) => {
  try {
    const obras = await Obra.findAll({
      where: {
        status: { [Op.ne]: 'finalizada' }
      }
    });
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

    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar obras por bairro' });
  }
};