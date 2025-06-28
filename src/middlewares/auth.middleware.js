const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) { // Seguridade na Conexao, para ver se o usuario esta conecato
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: 'Token inválido' });
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
