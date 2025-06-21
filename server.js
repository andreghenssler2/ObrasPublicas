// server.js (na raiz ou em src, como preferir)
require('dotenv').config();     // carrega variáveis .env
const app = require('./src/app'); // ajuste caminho se necessário

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});