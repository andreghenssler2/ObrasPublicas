const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

// const Usuario = require('../models/usuario');

exports.createUser = async (req, res) => {
  try {
    const user = await Usuario.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    // Sequelize Unique Constraint Error tem nome 'SequelizeUniqueConstraintError'
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Erro: Email já cadastrado!' });
    }
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
