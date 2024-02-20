const oracledb = require('oracledb');

const config = {
    user: 'FIXXUSER',
    password: 'FIXXUSER',
    connectString: 'localhost:1521/XEPDB1'
}

async function connectToDB() {
  try {
    await oracledb.createPool(config);
    console.log('Conexão com o banco de dados estabelecida.');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

async function closePoolAndExit() {
  try {
    await oracledb.getPool().close(10);
    console.log('Pool de conexões fechado.');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao fechar pool de conexões:', err);
    process.exit(1);
  }
}

process.once('SIGTERM', closePoolAndExit);
process.once('SIGINT', closePoolAndExit);

module.exports = { connectToDB };