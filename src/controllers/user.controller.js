const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  try {
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      }
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "Z6+LwZtFqQ4rG72DxfK9oMCEyXvUhGYTXPqFq7Oql2I=",
      { expiresIn: '1h' }
    );

    res.json({ token, nome: user.nome, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}

module.exports = {
  register,
  login,
};
