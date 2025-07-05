const { Etapa,Obra } = require('../models');

// Cria
exports.createEtapa = async (req, res) => {
  const { nome, descricao, status, obraId } = req.body;

  if (!nome || !obraId) {
    return res.status(400).json({ mensagem: 'Nome e obraId são obrigatórios' });
  }

  try {
    const etapa = await Etapa.create({ nome, descricao, status, obraId });
    res.status(201).json(etapa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar etapa' });
  }
};

//Edita
exports.updateStatusEtapa = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ mensagem: 'Status é obrigatório' });
  }

  const statusValidos = ['ESTUDO', 'LICENCIAMENTO', 'ORÇAMENTO','LICITAÇÃO','CONTRATACAO','NAO_INICIADA', 'EM_ANDAMENTO', 'CONCLUIDA'];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({ mensagem: 'Status inválido' });
  }

  try {
    const etapa = await Etapa.findByPk(id);
    if (!etapa) {
      return res.status(404).json({ mensagem: 'Etapa não encontrada' });
    }

    etapa.status = status;
    await etapa.save();

    res.json(etapa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar status da etapa' });
  }
};

// Lista etapa especifica
exports.listEtapasByObra = async (req, res) => {
  const { obraId } = req.params;

  if (!obraId) {
    return res.status(400).json({ mensagem: 'ObraId é obrigatório' });
  }

  try {
    const etapas = await Etapa.findAll({
      where: { obraId },
      order: [['createdAt', 'ASC']] // ou 'id' ASC, para ordem cronológica
    });
    
    if (etapas.length === 0) {
      return res.status(404).json({ mensagem: 'Não há obras encontradas' });
    }

    res.json(etapas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar etapas da obra' });
  }
};

// Listar historico de uma etapa de uma obra 
// exports.historicoEtapasPorObra = async (req, res) => {
//   try {
//     const { obraId } = req.params;

//     // Busca todas as etapas da obra específica
//     const etapas = await Etapa.findAll({
//       where: { obraId },
//       order: [['createdAt', 'ASC']],  // ordena pela criação (ou pode usar updatedAt)
//       include: {
//         model: Obra,
//         as: 'obra',
//         attributes: ['id', 'nome', 'status', 'localizacao']
//       }
//     });

//     res.json(etapas);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensagem: 'Erro ao consultar histórico de etapas da obra' });
//   }
// };