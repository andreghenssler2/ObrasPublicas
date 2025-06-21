const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml'); // Caminho para o arquivo swagger.yaml
const app = express(); 
const PORT = process.env.PORT || 3000;


const userRoutes = require('./src/routes/user.routes'); // ou caminho relativo correto

app.use(express.json()); // Middleware para analisar o corpo da requisição como JSON


app.use(express.static('public'));
//       // Retornar o token e os dados do usuário (sem a senha)
app.use('/api/usuarios', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});