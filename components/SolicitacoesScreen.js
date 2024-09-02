import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';
import { Octicons } from '@expo/vector-icons';
import ItemSolicitacao from './ItemSolicitacao.js';
import { NumberInMonth } from '../src/functions/NumberInMonth';


const SolicitacoesScreen = ({ navigation }) => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function buscaSolicitacoes() {
    const idFirebase = window.idFirebaseGlobal
    try {
        const response = await fetch(`http://${IpAtual}:3003/buscaSolicitacoes?idFirebase=${idFirebase}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Resultado da consulta:', data);
        const solicitacoesPendentes = data.filter(solicitacao => solicitacao[11] === 'P');
        setSolicitacoes(solicitacoesPendentes);
    } catch (error) {
        console.error('Consulta erro busca solicitacoes:', error);
    }
  }
  useEffect(() => {
    buscaSolicitacoes().then(() => setRefreshing(false));
  }, [reload]);
  

  async function aceitaSolicitacao(pId){
    const id = pId
    try {
        const response = await fetch(`http://${IpAtual}:3003/aceitarSolicitacao?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setSolicitacoes(prevSolicitacoes =>
          prevSolicitacoes.filter(solicitacao => solicitacao[10] !== pId)
        );
  
        setReload(prevReload => !prevReload);
        console.log('Resultado da consulta:', data);
    } catch (error) {
        console.error('Consulta erro busca solicitacoes:', error);
    }
  }

  async function recusaSolicitacao(pId){
    const id = pId
    try {
        const response = await fetch(`http://${IpAtual}:3003/recusarSolicitacao?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setSolicitacoes(prevSolicitacoes =>
          prevSolicitacoes.filter(solicitacao => solicitacao[10] !== pId)
        );
  
        setReload(prevReload => !prevReload);
        console.log('Resultado da consulta:', data);
    } catch (error) {
        console.error('Consulta erro busca solicitacoes:', error);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    setReload(prevReload => !prevReload); // Alterna o estado de 'reload' para forçar a recarga
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerScreen}>
        <Text style={styles.textHeaderScreen}>Solicitações</Text>
      </View>
      <View style={styles.containerFilter}>
        <Octicons name="arrow-switch" size={36} color={corAmarela} style={{ transform: [{ rotate: '90deg' }] }} />
        <Text style={{color: 'white', fontSize: 22, fontWeight:'bold', paddingLeft: 15}}>Últimas Solicitações</Text>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={corAmarela} />} style={styles.containerSolicitacoes} contentContainerStyle={styles.contentContainerSolicitacoes}>
        {solicitacoes.map((solicitacao, index) => (
          <ItemSolicitacao
            key={index}
            nome={`${solicitacao[0]} ${solicitacao[1]}`}
            dia={solicitacao[8].substring(8,10)}
            mes={NumberInMonth(parseInt(solicitacao[8].substring(5,7)),'N').toLowerCase()}
            endereco={`${solicitacao[2]}, ${solicitacao[3]}, ${solicitacao[4]}, ${solicitacao[5]} - ${solicitacao[7]}`}
            horario={solicitacao[9]}
            onUpdateAceitar={() => aceitaSolicitacao(solicitacao[10])}
            onUpdateRecusar={() => recusaSolicitacao(solicitacao[10])}
            idSolicitacao={solicitacao[10]}
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