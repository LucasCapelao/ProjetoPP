const oracledb = require('oracledb');

const dbConfig = {
    user: 'SYSTEM',
    password: 'FIXXDOCKER',
    connectString: 'localhost:1521/xe'
};

async function testarConexao() {
  try {
    // Estabelece a conexão com o banco de dados
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Conexão com o banco de dados Oracle estabelecida com sucesso.');

    // Executa uma consulta de teste
    const result = await connection.execute('SELECT * FROM pessoas');
    const ret = await connection.execute(`insert into cadastro values('Lucas',10)`);
    console.log('Consulta de teste executada com sucesso:', result.rows);

    // Fecha a conexão com o banco de dados
    await connection.close();
    console.log('Conexão com o banco de dados Oracle fechada.');

  } catch (error) {
    console.error('Erro ao testar a conexão com o banco de dados Oracle:', error);
  }
}

// Chama a função para testar a conexão
testarConexao();








// const os = require('os');
// const networkInfo = os.networkInterfaces();
// console.log(networkInfo.address) // objeto
// console.log(networkInfo[3].address) 