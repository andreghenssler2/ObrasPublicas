// src/models/sugestao.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sugestao = sequelize.define('Sugestao', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  mensagem: { type: DataTypes.TEXT, allowNull: false },
  tipo: { type: DataTypes.ENUM('SUGESTAO', 'RECLAMACAO', 'ELOGIO'), allowNull: false }
});

module.exports = Sugestao;
