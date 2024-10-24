import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { corAmarela, corCinzaSecundaria, IpAtual } from '../src/Constants/Constantes';
import { NumberInMonth } from '../src/functions/NumberInMonth';
import ItemSolicitacaoContratante from './ItemSolicitacaoContratante';
import { buscarImagem } from '../firebaseConnection';

const SolicitacoesContratanteScreen = ({ navigation }) => {
    const [situacao,setSituacao] = useState('P')
    const [solicitacoes,setSolicitacoes] = useState([])
    const [reload,setReload] = useState(false)
    const [carregarImagens,setCarregarImagens] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState({});

    const alterarSituacao = (situacao) =>{
        setSituacao(situacao)
        setRefreshing(true)
    }

    async function buscaSolicitacoes() {
        // let idFirebase = window.idFirebaseGlobal
        let idFirebase = 'qTgUJXYYJ9OT0uaMo0PDbhb7tl53'
        try {
            const response = await fetch(`http://${IpAtual}:3003/buscaSolicitacoesContratante?idFirebase=${idFirebase}&situacao=${situacao}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setSolicitacoes(data)
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
        } finally {
            setRefreshing(false); // Finaliza o indicador de atualização
        }
    }

    useEffect(() => {
        buscaSolicitacoes();
    }, [situacao]);

    const onRefresh = () => {
        setRefreshing(true);
        buscaSolicitacoes();
    };

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
            console.error('erro ao update solicitacoes:', error);
        }
    }

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
            console.error('erro ao update solicitacoes:', error);
        }
      }

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>Solicitaçõs</Text>
            </View>
            <View style={{width:'100%', marginTop: 20}}>
                <Text style={{color:'white', fontSize: 22, fontWeight:'bold', position:'absolute', left:20}}>Etapas</Text>
            </View>
            <View style={{width:'90%', height: 60, marginTop: 30, marginBottom: 30, alignItems:'center',flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{width:'100%', backgroundColor:corAmarela, height:1, position:'absolute'}}></View>
                <TouchableOpacity onPress={()=>alterarSituacao('P')} style={{width:100, height: 50, alignItems:'center', justifyContent:'center'}}>
                    {situacao === 'P'
                        ?<View style={{width:18, height: 18, backgroundColor:corAmarela, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                        :<View style={{width:18, height: 18, backgroundColor:corCinzaSecundaria, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                    }
                    <Text style={{position:'absolute', top:38, color:'white'}}>Pendentes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>alterarSituacao('E')} style={{width:100, height: 50, alignItems:'center', justifyContent:'center'}}>
                    {situacao === 'E'
                        ?<View style={{width:18, height: 18, backgroundColor:corAmarela, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                        :<View style={{width:18, height: 18, backgroundColor:corCinzaSecundaria, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                    }
                    <Text style={{position:'absolute', top:38, color:'white'}}>Enviadas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>alterarSituacao('A')} style={{width:100, height: 50, alignItems:'center', justifyContent:'center'}}>
                    {situacao === 'A'
                        ?<View style={{width:18, height: 18, backgroundColor:corAmarela, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                        :<View style={{width:18, height: 18, backgroundColor:corCinzaSecundaria, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                    }
                    <Text style={{position:'absolute', top:38, color:'white'}}>Confirmadas</Text>
                </TouchableOpacity>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={corAmarela} />} style={styles.containerOrcamentos} contentContainerStyle={styles.contentContainerOrcamentos}>
                {solicitacoes.map((solicitacao, index) => (
                    <ItemSolicitacaoContratante
                        key={index}
                        navigation={navigation}
                        nome={`${solicitacao[0]} ${solicitacao[1]}`}
                        fotoPerfil={fotoPerfil[index]}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        fontWeight: 'bold',
    },
    containerFilter:{
        width: '90%',
        height: 40,
        marginTop: 0,
        marginLeft: 10,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
        // backgroundColor: 'green'
      },
      containerOrcamentos:{
        width: '100%',
        // height: '40%',
        marginTop: 30,
        // backgroundColor: 'green',
      },
      contentContainerOrcamentos:{
        alignItems: 'center',
      }
});

export default SolicitacoesContratanteScreen;