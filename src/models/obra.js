const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Obra = sequelize.define('Obras', {
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

Obra.associate = (models) => {
  Obra.hasMany(models.Etapa, { foreignKey: 'obraId', as: 'etapas' });
};

module.exports = Obra;
