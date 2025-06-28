const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Obra = require('./obra');  // import para associar

const Etapa = sequelize.define('Etapa', { // Define as configurações no banco de dados de Etapas
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('ESTUDO', 'LICENCIAMENTO', 'ORÇAMENTO','LICITAÇÃO','CONTRATACAO','NAO_INICIADA', 'EM_ANDAMENTO', 'CONCLUIDA'),
    defaultValue: 'NAO_INICIADA'
  },
  obraId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Obras',
      key: 'id'
    }
  }
}, {
  tableName: 'Etapas',
  timestamps: true
});

// associação
// Etapa.belongsTo(Obra, { foreignKey: 'obraId', as: 'obra' });

module.exports = Etapa;
