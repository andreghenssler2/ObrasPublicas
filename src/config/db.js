// src/config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // nome do banco
  process.env.DB_USER,       // usuário
  process.env.DB_PASSWORD,   // senha
  {
    host: process.env.DB_HOST,   // host, ex: 'localhost'
    dialect: 'mysql',            // ou 'postgres', 'sqlite', etc.
    logging: false               // desabilita logs SQL no console
  }
);

// Teste de conexão (opcional)
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar no banco de dados:', err));

module.exports = sequelize;
