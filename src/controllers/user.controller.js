const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
  }

  const hashed = await bcrypt.hash(senha, 10);
  const user = await Usuario.create({ nome, email, senha: hashed, tipo });
  res.status(201).json(user);
};
