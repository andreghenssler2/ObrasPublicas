const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Etapa = sequelize.define('Etapa', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('NAO_INICIADA', 'EM_ANDAMENTO', 'CONCLUIDA'),
    defaultValue: 'NAO_INICIADA'
  },
  obraId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Obras',  // nome da tabela no banco de dados
        key: 'id'
      }
  }
});

module.exports = Etapa;
