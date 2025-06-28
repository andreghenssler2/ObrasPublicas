const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, usuario: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao realizar login' });
  }
};
