const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync(); // Cria tabelas se não existirem
    console.log('Banco conectado e sincronizado!');
    app.listen(PORT, () => console.log(`Servidor na porta http://localhost:${PORT}`));
  } catch (error) {
    console.error('Erro ao iniciar:', error);
  }
})();
