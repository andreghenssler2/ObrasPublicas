const express = require('express');
const router = express.Router(); // Cria um roteador para definir as rotas
const bcrypt = require('bcryptjs'); // Usado para fazer o hash da senha
const jwt = require('jsonwebtoken'); // Usado para gerar e verificar o token JWT
const { PrismaClient } = require('@prisma/client'); // Usado para interagir com o banco de dados


const prisma = new PrismaClient(); // Instancia o cliente Prisma para o acesso ao banco de dados
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto'; // Chave secreta para assinar os tokens JWT
const autenticarToken = (req, res, next) => {
  // Middleware para autenticar o token JWT
  // Verifica se o token está presente no cabeçalho da requisição
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  // Se o token não estiver presente, retorna erro 401
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Verifica e decodifica o token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' }); // Se o token for inválido, retorna erro 403 (proibido)
    req.user = user; // { id, tipo } // Salva as informações do usuário no objeto `req` para uso posterior
    next(); // Chama o próximo middleware ou rota
  });
};

// Controlador de usuários
const userController = {
  // Método para login
  login: async (req, res) => {
    const { email, senha } = req.body;

    // Validação básica: verificar se email e senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
      // Busca o usuário no banco de dados com base no email
      const usuario = await prisma.user.findUnique({ where: { email } });

      // Se o usuário não for encontrado, retorna erro 404
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Verificar se a senha é correta
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: usuario.id, tipo: usuario.tipo },
        'segredo_super_secreto', // Ideal usar variável de ambiente
        { expiresIn: '1d' }
      );

      // Retornar token ao cliente
      return res.status(200).json({ token });
    } catch (error) {
      // Caso ocorra algum erro no processo, retorna erro 500 (erro interno)
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
};
// Rota de teste (GET) - Apenas para verificar se a API está funcionando
router.get('/', (req, res) => {
  res.send('Rota de usuários funcionando!');
});

// Rota de cadastro (POST)
router.post('/register', async (req, res) => {
  const { nome, username,email, senha, tipo } = req.body;
  
  try {
    // Faz o hash da senha fornecida antes de armazená-la no banco de dados
    const senhaHash = await bcrypt.hash(senha, 10);
    // Cria um novo usuário no banco de dados
    const novoUsuario = await prisma.user.create({
      data: {
        nome,
        username,
        email,
        senha: senhaHash,
        tipo
      },
    });
    res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao registrar usuário' });
  }
});



module.exports = router;
