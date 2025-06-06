const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('@prisma/client').PrismaClient;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')

const app = express();
const port = 3000;
const prismaClient = new prisma();

app.use(express.json());

const swaggerDocument = YAML.load('./swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, 'seu-segredo', (err, user) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};
app.post('/api/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const validPassword = await bcrypt.compare(senha, usuario.senha);

    if (!validPassword) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'seu-segredo', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
});

// Rota para pegar as obras
app.get('/api/obras', authenticateToken, async (req, res) => {
  try {
    const obras = await prismaClient.obra.findMany();
    res.json(obras);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar obras' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
