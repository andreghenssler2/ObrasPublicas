// src/controllers/sugestao.controller.js
const { Sugestao } = require('../models');

exports.createSugestao = async (req, res) => {
  const { nome, email, mensagem, tipo } = req.body;

  if (!mensagem || !tipo) {
    return res.status(400).json({ mensagem: 'Mensagem e tipo são obrigatórios' });
  }

  const sugestao = await Sugestao.create({ nome, email, mensagem, tipo });
  res.status(201).json(sugestao);
};

exports.listSugestoes = async (req, res) => {
  const sugestoes = await Sugestao.findAll();
  res.json(sugestoes);
};