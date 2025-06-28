const { Usuario } = require('../models');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res) => { // Cria usuario,
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
    }

    const hashed = await bcrypt.hash(senha, 10);
    const user = await Usuario.create({ nome, email, senha: hashed, tipo });
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

// exports.createUser = async (req, res) => {
  
// };