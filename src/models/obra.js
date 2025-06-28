const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Etapa = require('./etapa');  // importar para associar

// 

const Obra = sequelize.define('Obra', {
  nome: { type: DataTypes.STRING, allowNull: false },
  localizacao: { type: DataTypes.STRING, allowNull: false },
  empresaResponsavel: DataTypes.STRING,
  cronograma: DataTypes.TEXT,
  orcamento: DataTypes.FLOAT,
  status: { type: DataTypes.STRING, defaultValue: 'ESTUDO' }
});

module.exports = Obra;


// associação
// Obra.hasMany(Etapa, { foreignKey: 'obraId', as: 'etapas' });

// module.exports = Obra;
