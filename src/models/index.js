const sequelize = require('../config/db'); // Conexao com o Banco de dados
const Usuario = require('./usuario'); // requer usuario
const Obra = require('./obra'); // requer obras
const Etapa = require('./etapa'); // requer etapas
const Sugestao = require('./sugestao'); // requer Sugestao

// Relacionamentos
// Obra.hasMany(Etapa, { as: 'etapas' });
// Defina as associações aqui
Obra.hasMany(Etapa, { foreignKey: 'obraId', as: 'etapas' });
Etapa.belongsTo(Obra, { foreignKey: 'obraId', as: 'obra' });
// Etapa.belongsTo(Obra);

module.exports = { sequelize, Usuario, Obra, Etapa,Sugestao };
