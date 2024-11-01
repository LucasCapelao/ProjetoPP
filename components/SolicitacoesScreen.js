import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';
import { Octicons } from '@expo/vector-icons';
import ItemSolicitacao from './ItemSolicitacao.js';
import { NumberInMonth } from '../src/functions/NumberInMonth';
import ModalNovoEvento from './ModalNovoEvento.js';
import { buscarImagem } from '../firebaseConnection.js';

const SolicitacoesScreen = ({ navigation }) => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modal,setModal] = useState(false);
  const [modalNome,setModalNome] = useState('');
  const [modalEndereco,setModalEndereco] = useState('');
  const [modalDia,setModalDia] = useState('');
  const [modalMes,setModalMes] = useState('');
  const [modalHoraInicio, setModalHoraInicio] = useState('')
  const [modalIdEndereco,setModalIdEndereco] = useState(0)
  const [filtroSituacao,setfiltroSituacao] = useState('P');
  const [fotoPerfil, setFotoPerfil] = useState({});
  const [modalDescricao,setModalDescricao] = useState('')

  const filtrarSituacao = (estado) =>{
    setfiltroSituacao(estado)
    setRefreshing(true)
  }

  const abrirModal = () =>{
    setModal(true)
  }

  const fecharModal = () =>{
    setModal(false)
  }

  async function buscaSolicitacoes() {
    // const idFirebase = window.idFirebaseGlobal
    const idFirebase = '63f7u1oXTHcI62Tin3UXnLqnRGH3'
    try {
        const response = await fetch(`http://${IpAtual}:3003/buscaSolicitacoes?idFirebase=${idFirebase}&situacao=${filtroSituacao}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Resultado da consulta:', data);
        // const solicitacoesPendentes = data.filter(solicitacao => solicitacao[11] === 'P');
        setSolicitacoes(data);
    } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
    } finally {
        setRefreshing(false); // Finaliza o indicador de atualização
    }
  }

  useEffect(() => {
    buscaSolicitacoes();
  }, [filtroSituacao]);
  
  useEffect(() => {
    const carregarFotos = async () => {
        if (solicitacoes.length === 0) return;

        const fotos = {};
        await Promise.all(
            solicitacoes.map(async (solicitacao, index) => {
                const refImage = solicitacao[13]; 
                if (refImage) {
                    try {
                        const url = await buscarImagem(refImage);
                        fotos[index] = url;
                    } catch (error) {
                        console.error(`Erro ao carregar a imagem do prestador ${index}:`, error);
                    }
                } else {
                    console.warn(`Solicitação ${index} não contém referência de imagem válida`);
                }
            })
        );
        setFotoPerfil(fotos);
    };

    carregarFotos();
}, [solicitacoes]);

  async function aceitaSolicitacao(pId,pNome,pEndereco,pDia,pMes,pHoraInicio,pIdEndereco,pDescricao){
    setModalNome(pNome)
    setModalEndereco(pEndereco)
    setModalDia(pDia)
    setModalMes(pMes)
    setModalHoraInicio(pHoraInicio)
    setModalIdEndereco(pIdEndereco)
    setModalDescricao(pDescricao)
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
        abrirModal()
    } catch (error) {
        console.error('Erro ao update solicitações:', error);
    } finally {
        setRefreshing(false); // Finaliza o indicador de atualização
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
        console.error('Erro ao update solicitações:', error);
    } finally {
        setRefreshing(false); // Finaliza o indicador de atualização
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    buscaSolicitacoes();
};

  return (
    <View style={styles.container}>
      <View style={styles.headerScreen}>
        <Text style={styles.textHeaderScreen}>Solicitações</Text>
      </View>
      <View style={{width:'90%',height:50,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>{filtrarSituacao('P')}} style={filtroSituacao == 'P' ? styles.filtroSituacao : styles.filtroSituacaoDesativado}>
                <Text style={filtroSituacao == 'P' ? styles.textAtivo : styles.textDesativado}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{filtrarSituacao('C')}} style={filtroSituacao == 'C' ? styles.filtroSituacao : styles.filtroSituacaoDesativado}>
                <Text style={filtroSituacao == 'C' ? styles.textAtivo : styles.textDesativado}>A Confirmar</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.containerFilter}>
        <Octicons name="arrow-switch" size={36} color={corAmarela} style={{ transform: [{ rotate: '90deg' }] }} />
        <Text style={{color: 'white', fontSize: 22, fontWeight:'bold', paddingLeft: 15}}>Últimas Solicitações</Text>
      </View>
      <ModalNovoEvento 
        pVisible={modal} 
        pFecharModal={fecharModal} 
        pNome={modalNome} 
        pEndereco={modalEndereco}
        pDia={modalDia}
        pMes={modalMes}
        pHoraInicio={modalHoraInicio}
        pIdEndereco={modalIdEndereco}
        pDescricao={modalDescricao} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={corAmarela} />} style={styles.containerSolicitacoes} contentContainerStyle={styles.contentContainerSolicitacoes}>
        {solicitacoes.map((solicitacao, index) => (
          <ItemSolicitacao
            key={index}
            nome={`${solicitacao[0]} ${solicitacao[1]}`}
            fotoPerfil={fotoPerfil[index]}
            dia={solicitacao[8].substring(8,10)}
            mes={NumberInMonth(parseInt(solicitacao[8].substring(5,7)),'N').toLowerCase()}
            endereco={`${solicitacao[2]}, ${solicitacao[3]}, ${solicitacao[4]}, ${solicitacao[5]} - ${solicitacao[7]}`}
            horario={`${solicitacao[9].substring(0,2)}:${solicitacao[9].substring(2,4)}`}
            onUpdateAceitar={() => aceitaSolicitacao(solicitacao[10],`${solicitacao[0]} ${solicitacao[1]}`,`${solicitacao[2]}, ${solicitacao[3]}, ${solicitacao[4]}, ${solicitacao[5]} - ${solicitacao[7]}`,solicitacao[8].substring(8,10),NumberInMonth(parseInt(solicitacao[8].substring(5,7)),'S').toLowerCase().substring(0,3),`${solicitacao[9].substring(0,2)}:${solicitacao[9].substring(2,4)}`,solicitacao[12],solicitacao[14])}
            onUpdateRecusar={() => recusaSolicitacao(solicitacao[10])}
            idSolicitacao={solicitacao[10]}
            situacao={'C'}
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
  },
  filtroSituacao:{
    width: '48%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: corCinzaPrincipal,
    marginTop:10,
    borderRadius: 10
  },
  filtroSituacaoDesativado:{
    width: '48%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: corAmarela,
    marginTop:10,
    borderRadius: 10
  },
  textAtivo:{
    color: corAmarela,
    fontWeight: 'bold',
    fontSize: 15
  },
  textDesativado:{
    color: corCinzaPrincipal,
    fontWeight: 'bold',
    fontSize: 15
  }
})