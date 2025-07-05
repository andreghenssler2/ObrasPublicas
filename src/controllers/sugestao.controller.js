// src/controllers/sugestao.controller.js
const { Sugestao } = require('../models');

exports.createSugestao = async (req, res) => { // Cria sugestao do Cidadao
  const { nome, email, mensagem, tipo } = req.body;

  if (!mensagem || !tipo) {
    return res.status(400).json({ mensagem: 'Mensagem e tipo são obrigatórios' });
  }

  const sugestao = await Sugestao.create({ nome, email, mensagem, tipo });
  // if (sugestao.length === 0) {
  //     return res.status(404).json({ mensagem: 'Não há SUGESTÕES de Cidadão encontradas' });
  // }
  res.status(201).json(sugestao);
};

exports.listSugestoes = async (req, res) => { // Lista as Sugestoes, todas
  const sugestoes = await Sugestao.findAll();
  if (sugestoes.length === 0) {
      return res.status(404).json({ mensagem: 'Não há SUGESTÕES de Cidadão encontradas' });
  }
  res.json(sugestoes);
};