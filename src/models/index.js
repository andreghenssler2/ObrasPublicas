const sequelize = require('../config/db');
const Usuario = require('./usuario');
const Obra = require('./obra');
const Etapa = require('./etapa');
const Sugestao = require('./sugestao');

// Relacionamentos
// Obra.hasMany(Etapa, { as: 'etapas' });
// Defina as associações aqui
Obra.hasMany(Etapa, { foreignKey: 'obraId', as: 'etapas' });
Etapa.belongsTo(Obra, { foreignKey: 'obraId', as: 'obra' });
// Etapa.belongsTo(Obra);

module.exports = { sequelize, Usuario, Obra, Etapa,Sugestao };
