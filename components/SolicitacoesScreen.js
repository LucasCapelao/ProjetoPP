import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';
import { Octicons } from '@expo/vector-icons';
import ItemSolicitacao from './ItemSolicitacao.js';


const SolicitacoesScreen = ({ navigation }) => {
  const [endereco,setEndereco] = useState('Av. Unisinos, 950 - Cristo Rei, São Leopoldo - RS, 93022-750');
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    async function buscaSolicitacoes() {
      const idFirebase = 'aklsdqhduwnsvosidcce'
      try {
          const response = await fetch(`http://${IpAtual}:3003/buscaSolicitacoes?idFirebase=${idFirebase}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          const data = await response.json();
          console.log('Resultado da consulta:', data);
          setSolicitacoes(data);
      } catch (error) {
          console.error('Consulta erro busca solicitacoes:', error);
      }
    }
    buscaSolicitacoes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerScreen}>
        <Text style={styles.textHeaderScreen}>Solicitações</Text>
      </View>
      <View style={styles.containerFilter}>
        <Octicons name="arrow-switch" size={36} color={corAmarela} style={{ transform: [{ rotate: '90deg' }] }} />
        <Text style={{color: 'white', fontSize: 22, fontWeight:'bold', paddingLeft: 15}}>Últimas Solicitações</Text>
      </View>
      <ScrollView style={styles.containerSolicitacoes} contentContainerStyle={styles.contentContainerSolicitacoes}>
        {/* <ItemSolicitacao nome="João da Silva" dia="09" mes="nov" endereco={endereco} horario="10:30"/> */}
        {solicitacoes.map((solicitacao, index) => (
          <ItemSolicitacao
            key={index}
            nome={`Solicitante ${solicitacao[0]}`} // Ajuste conforme necessário para exibir o nome correto
            dia={solicitacao[1]}
            mes={solicitacao[2]}
            endereco={endereco}
            horario={solicitacao[5]}
          />
        ))}
      </ScrollView>
    </View>


  );
};

export default SolicitacoesScreen;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center'
  },
  headerScreen:{
      width: '90%',
      backgroundColor: corAmarela,
      height: '12%',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
  },
  textHeaderScreen:{
      fontSize: 28,
      fontWeight: 'bold'
  },
  containerFilter:{
    width: '90%',
    height: 40,
    marginTop: 30,
    marginLeft: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
    // backgroundColor: 'green'
  },
  containerSolicitacoes:{
    width: '100%',
    // height: '40%',
    marginTop: 30,
    // backgroundColor: 'green',
  },
  contentContainerSolicitacoes:{
    alignItems: 'center',
  }
})