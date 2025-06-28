const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
require('dotenv').config();

exports.login = async (req, res) => { // Login de usuario
  try{
    console.log(senha);
    const { email, senha } = req.body;
    const user = await Usuario.findOne({ where: { email } });
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ mensagem: 'Senha incorreta' });
    
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro no login' });
  }
  
};

