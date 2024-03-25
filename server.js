const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
    user: 'FIXXUSER',
    password: 'FIXXUSER',
    connectString: 'localhost:1521/XEPDB1'
};


app.get('/executarConsulta', async (req, res)=>{
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('select * from pessoas');
    await connection.close();
    res.send(result.rows);    
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.post('/insertPrestante', async (req, res) => {
  try {
    const { idFirebaseDB, nomeDB, sobrenomeDB, generoDB, dataNascimentoDB, cpfDB, graduacaoDB, especialidadeDB, foneDB, emailDB } = req.body;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`INSERT INTO PRESTANTES (idFirebase, nome, sobrenome, genero, dataNascimento, cpf, graduacao, especialidade, fone, email) VALUES (:idFirebase, :nome, :sobrenome, :genero, TO_DATE(:dataNascimento, 'DD-MM-YYYY'), :cpf, :graduacao, :especialidade, :fone, :email)`, {idFirebase: idFirebaseDB, nome: nomeDB, sobrenome: sobrenomeDB, genero: generoDB, dataNascimento: dataNascimentoDB, cpf: cpfDB, graduacao: graduacaoDB, especialidade: especialidadeDB, fone: foneDB, email: emailDB});
    connection.commit();
    await connection.close();
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro ao cadastrar.' });
  }
});

app.post('/insertContratante', async (req, res) => {
  try {
    const { idFirebaseDB, nomeDB, sobrenomeDB, generoDB, dataNascimentoDB, cpfDB, cepDB, ufDB, municipioDB, bairroDB, ruaDB, numeroDB, complementoDB, foneDB, emailDB } = req.body;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`INSERT INTO CONTRATANTES (idFirebase, nome, sobrenome, genero, dataNascimento, cpf, cep, uf, municipio, bairro, rua, numero, complemento, fone, email) VALUES (:idFirebase, :nome, :sobrenome, :genero, TO_DATE(:dataNascimento, 'DD-MM-YYYY'), :cpf, :cep, :uf, :municipio, :bairro, :rua, :numero, :complemento, :fone, :email)`, {idFirebase: idFirebaseDB, nome: nomeDB, sobrenome: sobrenomeDB, genero: generoDB, dataNascimento: dataNascimentoDB, cpf: cpfDB, cep: cepDB, uf: ufDB, municipio: municipioDB, bairro: bairroDB, rua: ruaDB, numero: numeroDB, complemento: complementoDB, fone: foneDB, email: emailDB});
    connection.commit();
    await connection.close();
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro ao cadastrar.' });
  }
});

app.post('/insertFirebaseXTipoUsuario', async (req, res) => {
  try {
    const { idFirebaseDB, tipoUsuarioDB} = req.body;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`INSERT INTO FIREBASEXTIPOUSUARIO (idFirebase, tipoUsuario) VALUES (:idFirebase, :tipoUsuario)`, {idFirebase: idFirebaseDB, tipoUsuario: tipoUsuarioDB});
    connection.commit();
    await connection.close();
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro ao cadastrar.' });
  }
});

app.get('/verificaTipoUsuario', async (req, res)=>{
  try {
    const {idFirebase} = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`select * from FIREBASEXTIPOUSUARIO a where a.idFirebase = :idFirebase`, [idFirebase]);
    await connection.close();
    res.send(result.rows);    
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.get('/query', async (req, res)=>{
  try {
    const {nome} = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`select * from pessoas a where a.nome = :nome`, [nome]);
    await connection.close();
    res.send(result.rows);    
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.get('/buscaGenero', async (req, res)=>{
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM COMBOGENERO`);
    await connection.close();
    res.json(result.rows);    
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.get('/buscaEspecialidades', async (req, res)=>{
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM COMBOESPECIALIDADES`);
    await connection.close();
    res.json(result.rows);    
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.get('/buscaGraduacao', async (req, res)=>{
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM COMBOGRADUACAO`);
    await connection.close();
    res.json(result.rows);    
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

//dar o commit no banco antes de qualquer consulta/alteração
app.get('/calculaIndice', async (req, res) => {
  try {
    const { idFirebase } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT count(*) FROM testeindices a WHERE a.idfirebase = :idFirebase`,[idFirebase]);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.post('/insertCadastro', async (req, res) => {
  try {
    const { nome, idade } = req.body;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`INSERT INTO cadastro (nome, idade) VALUES (:nome, :idade)`, [nome, idade]);
    connection.commit();
    await connection.close();
    res.send({ success: true });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro ao cadastrar.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
