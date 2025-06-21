const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { nome, username, email, senha, tipo } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome,username, email, senha: hash, tipo });
    res.status(201).json({ msg: 'Usuário criado', user });
  } catch (err) {
    res.status(400).json({ msg: 'Erro ao registrar', err });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no login ', err });
  }
};
