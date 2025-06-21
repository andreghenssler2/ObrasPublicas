require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const userRoutes = require('./routes/user.routes');
const obraRoutes = require('./routes/obra.routes');
const melhoriaRoutes = require('./routes/melhoria.routes');
const etapaRoutes = require('./routes/etapa.routes');
const publicRoutes = require('./routes/public.routes');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/usuarios', userRoutes);
app.use('/api/obras', obraRoutes);
app.use('/api/melhorias', melhoriaRoutes);
app.use('/api/etapas', etapaRoutes);
app.use('/api/public', publicRoutes);

app.get('/', (req, res) => {
  res.send('ObraFácil API - funcionando');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
