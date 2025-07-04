const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

// depois vem suas rotas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const obraRoutes = require('./routes/obra.routes');
const etapaRoutes = require('./routes/etapa.routes');
const sugestaoRoutes = require('./routes/sugestao.routes');
const publicRoutes = require('./routes/public.routes');

// documentação do Swagger
const { swaggerUi, specs } = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Api para rotas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/obras', obraRoutes);
app.use('/api/obras', obraRoutes);
app.use('/api/etapas', etapaRoutes);

app.use('/api/sugestoes',sugestaoRoutes);
app.use('/api/public', publicRoutes);

app.get('/', (req, res) => {
  res.send('ObraFácil API - funcionando');
});

module.exports = app;
