const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
// const obraRoutes = require('./routes/obra.routes');
const authMiddleware = require('./middlewares/auth.middleware');

require('dotenv').config();
require('./config/db'); // conexão com o banco

app.use(express.json());

app.use('/api/usuarios', userRoutes);
// app.use('/api/obras',authMiddleware, obraRoutes);

module.exports = app;
