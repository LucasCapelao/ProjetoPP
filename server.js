const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
    user: 'SYSTEM',
    password: 'FIXXDOCKER',
    connectString: 'localhost:1521/xe'
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

app.get('/buscaInfosUsuario', async (req, res) => {
  try {
    const { tabelaSelect, idFirebase } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `SELECT a.nome FROM ${tabelaSelect} a WHERE a.idfirebase = :idFirebase`;
    const result = await connection.execute(sqlStatement, [idFirebase]);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.get('/buscaSolicitacoes', async (req, res) => {
  try {
    const { idFirebase } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    // const sqlStatement = `SELECT * FROM SOLICITACOES a WHERE a.id_prestante = (SELECT b.id FROM PESSOAS b WHERE b.idFirebase = '${idFirebase}')`;
    const sqlStatement = `
      SELECT 
        c.nome,
        c.sobrenome,
        e.rua,
        e.numero,
        e.bairro,
        e.municipio,
        e.cep,
        e.uf,
        a.data_servico,
        a.hora_servico,
        a.id,
        a.situacao
      FROM SOLICITACOES a 
      JOIN PESSOAS b ON a.id_prestante = b.id
      JOIN PESSOAS c ON a.id_contratante = c.id
      JOIN ENDERECOS e ON e.id = a.id_endereco
      WHERE a.id_prestante = (SELECT pess.id FROM PESSOAS pess WHERE pess.idFirebase = '${idFirebase}')
      AND a.situacao = 'P'
      ORDER BY a.data_servico,a.data_enviado`;
    const result = await connection.execute(sqlStatement);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: 'Erro ao executar consulta.' });
  }
});

app.put('/aceitarSolicitacao', async (req, res) => {
  try {
    const { id } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `UPDATE SOLICITACOES SET situacao = 'A' WHERE id = ${id}`
    const result = await connection.execute(sqlStatement);
    connection.commit();
    await connection.close();
    res.send({ success: true });
  } catch (error) {
    console.error('Erro update solicitacao:', error);
    res.status(500).json({ error: 'Erro update solicitacao' });
  }
});

app.put('/recusarSolicitacao', async (req, res) => {
  try {
    const { id } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `UPDATE SOLICITACOES SET situacao = 'R' WHERE id = ${id}`
    const result = await connection.execute(sqlStatement);
    connection.commit();
    await connection.close();
    res.send({ success: true });
  } catch (error) {
    console.error('Erro update solicitacao:', error);
    res.status(500).json({ error: 'Erro update solicitacao' });
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

app.post('/insertPessoas', async (req, res) => {
  try {
    const { idFirebase, nome, sobrenome, genero, dataNascimento, cpf, graduacao, especialidade, fone, email, idPessoa, cep, uf, municipio, bairro, rua, numero, complemento } = req.body;
    const {possuiEndereco} = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const insertPessoa = `
      INSERT INTO PESSOAS (idFirebase, nome, sobrenome, genero, dataNascimento, cpf, graduacao, especialidade, fone, email) 
      VALUES (${idFirebase}, ${nome}, ${sobrenome}, ${genero}, TO_DATE(${dataNascimento}, 'DD-MM-YYYY'), ${cpf}, ${graduacao}, ${especialidade}, ${fone}, ${email})
    `
    console.log(insertPessoa);
    let result = await connection.execute(`INSERT INTO PESSOAS (idFirebase, nome, sobrenome, genero, dataNascimento, cpf, graduacao, especialidade, fone, email) VALUES (:idFirebase, :nome, :sobrenome, :genero, TO_DATE(:dataNascimento, 'DD-MM-YYYY'), :cpf, :graduacao, :especialidade, :fone, :email)`, [idFirebase, nome, sobrenome , genero, dataNascimento, cpf, graduacao, especialidade, fone, email]);
    console.log(`result 1: ${JSON.stringify(result)}`)
    if(possuiEndereco === 'S'){
      // result = await connection.execute(`INSERT INTO ENDERECOS (idPessoa, cep, uf, municipio, bairro, rua, numero, complemento) VALUES (:idPessoa, :cep, :uf, :municipio, :bairro, :rua, :numero, :complemento)`, [idPessoa, cep, uf, municipio, bairro, rua, numero, complemento]);
      result = await connection.execute(`INSERT INTO ENDERECOS (idPessoa, cep, uf, municipio, bairro, rua, numero, complemento) VALUES ((SELECT id FROM PESSOAS WHERE idfirebase = :idFirebase), :cep, :uf, :municipio, :bairro, :rua, :numero, :complemento)`, [idFirebase, cep, uf, municipio, bairro, rua, numero, complemento]);
      console.log(`result 2: ${JSON.stringify(result)}`)
    }
    connection.commit();
    await connection.close();
    res.send({ success: true });
  } catch (error) {
    console.error('Erro ao cadastrar tabela de pessoas:', error);
    res.status(500).json({ error: 'Erro ao cadastrar.' });
  }
});

app.get('/buscaServicos', async (req, res) => {
  try {
    const { idFirebase, mes, ano } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    let result = await connection.execute('SELECT id FROM PESSOAS WHERE idFirebase = :idFirebase',[idFirebase]);
    let idPrestante = result.rows[0]
    const sqlString = `
      SELECT COUNT(dataServico)
      FROM SERVICOS
      WHERE TO_CHAR(dataServico, 'MM') = '${mes}' 
        AND TO_CHAR(dataServico, 'YYYY') = '${ano}' 
        AND idPrestante = '${idPrestante}'
    `;
    result = await connection.execute(sqlString);
    console.log('Resultado da consulta server.js:', result.rows);
    res.json(result.rows[0][0]);
    await connection.close();
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).json({ error: `Erro ao executar consulta.` });
  }
});

app.post('/insertEventos', async (req, res) => {
  try {
    const { idFirebase, mes, dia, horaInicio, horaFinal, descricao, situacao } = req.body;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`INSERT INTO EVENTOS(idFirebase,mes,dia,horaInicio,horaFinal,descricao,situacao) VALUES(:idFirebase,:mes,:dia,:horaInicio,:horaFinal,:descricao,:situacao)`, [idFirebase,mes,dia,horaInicio,horaFinal,descricao,situacao]);
    connection.commit();
    await connection.close();
    res.send({ success: true });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro ao cadastrar.' });
  }
});

app.get('/buscaDias', async (req, res) => {
  try {
    const { mes } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `SELECT * FROM ${mes}`;
    const result = await connection.execute(sqlStatement);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao buscar dias:', error);
    res.status(500).json({ error: 'Erro ao buscar dias' });
  }
});

app.get('/buscaEventos', async (req, res) => {
  try {
    const { dia,mes,idFirebase } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `SELECT e.id, e.mes, e.dia, e.horaInicio, e.horaFinal, e.descricao, CASE WHEN e.situacao = 'P' THEN 'Pendente' WHEN e.situacao = 'C' THEN 'Cancelado' ELSE 'Finalizado' END situacao, p.nome, p.sobrenome, end.cep, end.uf, end.municipio, end.bairro, end.rua, end.numero FROM EVENTOS e JOIN PESSOAS p ON e.idFirebase = p.idFirebase JOIN ENDERECOS end ON p.id = end.idPessoa WHERE e.idFirebase = '${idFirebase}' AND e.mes = '${mes}' AND e.dia = ${dia}`;
    // const sqlStatement = `SELECT * FROM EVENTOS e JOIN PESSOAS p ON e.idFirebase = p.idFirebase JOIN ENDERECOS end ON p.id = end.idPessoa WHERE e.idFirebase = '${idFirebase}' AND e.mes = '${mes}' AND e.dia = ${dia}`;
    const result = await connection.execute(sqlStatement);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});

app.put('/cancelarEvento', async (req, res) => {
  try {
    const { id } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `UPDATE EVENTOS SET situacao = 'C' WHERE id = ${id}`
    const result = await connection.execute(sqlStatement);
    connection.commit();
    await connection.close();
    res.send({ success: true });
  } catch (error) {
    console.error('Erro update evento:', error);
    res.status(500).json({ error: 'Erro update evento' });
  }
});

app.get('/buscaEventosPorMes', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `
    SELECT 
      SUM(CASE WHEN mes = 'Janeiro' THEN 1 ELSE 0 END) AS Janeiro,
      SUM(CASE WHEN mes = 'Fevereiro' THEN 1 ELSE 0 END) AS Fevereiro,
      SUM(CASE WHEN mes = 'Março' THEN 1 ELSE 0 END) AS Março,
      SUM(CASE WHEN mes = 'Abril' THEN 1 ELSE 0 END) AS Abril,
      SUM(CASE WHEN mes = 'Maio' THEN 1 ELSE 0 END) AS Maio,
      SUM(CASE WHEN mes = 'Junho' THEN 1 ELSE 0 END) AS Junho,
      SUM(CASE WHEN mes = 'Julho' THEN 1 ELSE 0 END) AS Julho,
      SUM(CASE WHEN mes = 'Agosto' THEN 1 ELSE 0 END) AS Agosto,
      SUM(CASE WHEN mes = 'Setembro' THEN 1 ELSE 0 END) AS Setembro,
      SUM(CASE WHEN mes = 'Outubro' THEN 1 ELSE 0 END) AS Outubro,
      SUM(CASE WHEN mes = 'Novembro' THEN 1 ELSE 0 END) AS Novembro,
      SUM(CASE WHEN mes = 'Dezembro' THEN 1 ELSE 0 END) AS Dezembro
    FROM EVENTOS`;
    const result = await connection.execute(sqlStatement);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao buscar eventos por mes:', error);
    res.status(500).json({ error: 'Erro ao buscar eventos por mes' });
  }
});

app.get('/buscaEventosPorDia', async (req, res) => {
  try {
    const {mes} = req.query
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `
    SELECT
      COUNT(CASE WHEN dia = 1 THEN 1 END) AS "Dia 1",
      COUNT(CASE WHEN dia = 2 THEN 1 END) AS "Dia 2",
      COUNT(CASE WHEN dia = 3 THEN 1 END) AS "Dia 3",
      COUNT(CASE WHEN dia = 4 THEN 1 END) AS "Dia 4",
      COUNT(CASE WHEN dia = 5 THEN 1 END) AS "Dia 5",
      COUNT(CASE WHEN dia = 6 THEN 1 END) AS "Dia 6",
      COUNT(CASE WHEN dia = 7 THEN 1 END) AS "Dia 7",
      COUNT(CASE WHEN dia = 8 THEN 1 END) AS "Dia 8",
      COUNT(CASE WHEN dia = 9 THEN 1 END) AS "Dia 9",
      COUNT(CASE WHEN dia = 10 THEN 1 END) AS "Dia 10",
      COUNT(CASE WHEN dia = 11 THEN 1 END) AS "Dia 11",
      COUNT(CASE WHEN dia = 12 THEN 1 END) AS "Dia 12",
      COUNT(CASE WHEN dia = 13 THEN 1 END) AS "Dia 13",
      COUNT(CASE WHEN dia = 14 THEN 1 END) AS "Dia 14",
      COUNT(CASE WHEN dia = 15 THEN 1 END) AS "Dia 15",
      COUNT(CASE WHEN dia = 16 THEN 1 END) AS "Dia 16",
      COUNT(CASE WHEN dia = 17 THEN 1 END) AS "Dia 17",
      COUNT(CASE WHEN dia = 18 THEN 1 END) AS "Dia 18",
      COUNT(CASE WHEN dia = 19 THEN 1 END) AS "Dia 19",
      COUNT(CASE WHEN dia = 20 THEN 1 END) AS "Dia 20",
      COUNT(CASE WHEN dia = 21 THEN 1 END) AS "Dia 21",
      COUNT(CASE WHEN dia = 22 THEN 1 END) AS "Dia 22",
      COUNT(CASE WHEN dia = 23 THEN 1 END) AS "Dia 23",
      COUNT(CASE WHEN dia = 24 THEN 1 END) AS "Dia 24",
      COUNT(CASE WHEN dia = 25 THEN 1 END) AS "Dia 25",
      COUNT(CASE WHEN dia = 26 THEN 1 END) AS "Dia 26",
      COUNT(CASE WHEN dia = 27 THEN 1 END) AS "Dia 27",
      COUNT(CASE WHEN dia = 28 THEN 1 END) AS "Dia 28",
      COUNT(CASE WHEN dia = 29 THEN 1 END) AS "Dia 29",
      COUNT(CASE WHEN dia = 30 THEN 1 END) AS "Dia 30",
      COUNT(CASE WHEN dia = 31 THEN 1 END) AS "Dia 31"
    FROM EVENTOS
    WHERE mes = '${mes}'`;
    const result = await connection.execute(sqlStatement);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao buscar eventos por dia:', error);
    res.status(500).json({ error: 'Erro ao buscar eventos por dia' });
  }
});

app.get('/buscaAvaliacoes', async (req, res) => {
  try {
    const { idFirebase } = req.query;
    const connection = await oracledb.getConnection(dbConfig);
    const sqlStatement = `SELECT a.id, SYSDATE - a.diaavaliacao AS Dia, a.avaliacao, COUNT(*) OVER () AS total, p.nome, p.sobrenome FROM AVALIACOES a JOIN SERVICOS s ON s.id = a.idServico JOIN PESSOAS p ON p.id = s.idPrestante WHERE p.idFirebase='${idFirebase}'`;
    const result = await connection.execute(sqlStatement);
    console.log('Resultado da consulta server.js:', result.rows);
    await connection.close();
    res.send(result.rows);
  } catch (error) {
    console.error('Erro ao buscar avaliacoes:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliacoes' });
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
