// src/config/db.js
require('dotenv').config(); // Primeiro!
const { Sequelize } = require('sequelize');

// console.log('Senha carregada do .env:', process.env.DB_PASSWORD); // Debug

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, // isso precisa ser uma string!
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);
