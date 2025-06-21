const express = require('express');
const app = express(); 
const userRoutes = require('./src/routes/user.routes'); // ou caminho relativo correto

app.use(express.json()); // Middleware para analisar o corpo da requisição como JSON
//       // Retornar o token e os dados do usuário (sem a senha)
app.use('/api/usuarios', userRoutes);

//       return res.status(200).json({ token, usuario: { ...usuario, senha: undefined } });
app.listen(3000, () => console.log('Servidor rodando na porta http://localhost:3000')); 
