const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', { // Define as configurações no banco de dados da Usuario
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  senha: DataTypes.STRING,
  tipo: { type: DataTypes.ENUM('ADMIN', 'SERVIDOR'), defaultValue: 'SERVIDOR' }
});

module.exports = Usuario;
