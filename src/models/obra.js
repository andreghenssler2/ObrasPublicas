const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Etapa = require('./etapa');  // importar para associar

const Obra = sequelize.define('Obras', { // Define as configurações no banco de dados da Obra
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
  },
  empresa_responsavel: {
    type: DataTypes.STRING,
  },
  cronograma: {
    type: DataTypes.TEXT,
  },
  orcamento: {
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.ENUM('PLANEJAMENTO', 'EM_EXECUCAO', 'FINALIZADO'),
    defaultValue: 'PLANEJAMENTO',
  }
}, {
  tableName: 'Obras',
  timestamps: true
});

// associação
// Obra.hasMany(Etapa, { foreignKey: 'obraId', as: 'etapas' });

module.exports = Obra;
