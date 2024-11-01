import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { corAmarela, corCinzaSecundaria, IpAtual } from '../src/Constants/Constantes';
import { ItemOrcamento } from './ItemOrcamento';
import { NumberInMonth } from '../src/functions/NumberInMonth';
import { buscarImagem } from '../firebaseConnection';


const OrcamentosScreen = ({ navigation }) => {
    const [situacao,setSituacao] = useState('1')
    const [filtro,setFiltro] = useState('a.data asc')
    const [orcamentos,setOrcamentos] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState({});

    const alterarSituacao = (situacao) =>{
        setSituacao(situacao)
        setRefreshing(true)
    }

    const mudarFiltro = () =>{
        if(filtro === 'a.data asc'){
            setFiltro('a.valor')
        }else{
            setFiltro('a.data asc')
        }
        setRefreshing(true)
    }

    async function buscaOrcamentos() {
        // let idFirebase = window.idFirebaseGlobal
        let idFirebase = 'qTgUJXYYJ9OT0uaMo0PDbhb7tl53'
        try {
            const response = await fetch(`http://${IpAtual}:3003/buscaOrcamentos?idFirebase=${idFirebase}&ordernacao=${filtro}&situacao=${situacao}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setOrcamentos(data)
        } catch (error) {
            console.error('Erro ao buscar orcamentos:', error);
        } finally {
            setRefreshing(false); // Finaliza o indicador de atualização
        }
    }

    useEffect(() => {
        buscaOrcamentos()
    }, [situacao,filtro]);

    useEffect(() => {
        const carregarFotos = async () => {
            if (orcamentos.length === 0) return;

            const fotos = {};
            await Promise.all(
                orcamentos.map(async (orcamento, index) => {
                    const refImage = orcamento[10]; 
                    if (refImage) {
                        try {
                            const url = await buscarImagem(refImage);
                            fotos[index] = url;
                        } catch (error) {
                            console.error(`Erro ao carregar a imagem ${index}:`, error);
                        }
                    } else {
                        console.warn(`Orcamentos ${index} não contém referência de imagem válida`);
                    }
                })
            );
            setFotoPerfil(fotos);
        };

        carregarFotos();
    }, [orcamentos]);

    const onRefresh = () => {
        setRefreshing(true);
        buscaOrcamentos();
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>Orçamentos</Text>
            </View>
            <View style={{width:'100%', marginTop: 20}}>
                <Text style={{color:'white', fontSize: 22, fontWeight:'bold', position:'absolute', left:20}}>Etapas</Text>
            </View>
            <View style={{width:'90%', height: 60, marginTop: 30, marginBottom: 30, alignItems:'center',flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{width:'100%', backgroundColor:corAmarela, height:1, position:'absolute'}}></View>
                <TouchableOpacity onPress={()=>alterarSituacao('1')} style={{width:100, height: 50, alignItems:'center', justifyContent:'center'}}>
                    {situacao === '1'
                        ?<View style={{width:18, height: 18, backgroundColor:corAmarela, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                        :<View style={{width:18, height: 18, backgroundColor:corCinzaSecundaria, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                    }
                    <Text style={{position:'absolute', top:38, color:'white'}}>Pendente</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>alterarSituacao('2')} style={{width:100, height: 50, alignItems:'center', justifyContent:'center'}}>
                    {situacao === '2'
                        ?<View style={{width:18, height: 18, backgroundColor:corAmarela, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                        :<View style={{width:18, height: 18, backgroundColor:corCinzaSecundaria, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                    }
                    <Text style={{position:'absolute', top:38, color:'white'}}>Aguardando</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>alterarSituacao('3')} style={{width:100, height: 50, alignItems:'center', justifyContent:'center'}}>
                    {situacao === '3'
                        ?<View style={{width:18, height: 18, backgroundColor:corAmarela, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                        :<View style={{width:18, height: 18, backgroundColor:corCinzaSecundaria, borderRadius:'100%', borderColor:'white', borderWidth:3}}></View>
                    }
                    <Text style={{position:'absolute', top:38, color:'white'}}>Finalizado</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.containerFilter} onPress={()=>mudarFiltro()}>
                <Octicons name="arrow-switch" size={32} color={corAmarela} style={{ transform: [{ rotate: '90deg' }] }} />
                {filtro==='a.valor'
                    ?<Text style={{color: 'white', fontSize: 21, fontWeight:'bold', paddingLeft: 15}}>Valor (R$)</Text>
                    :<Text style={{color: 'white', fontSize: 21, fontWeight:'bold', paddingLeft: 15}}>Data (crescente)</Text>
                }
            </TouchableOpacity>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={corAmarela} />} style={styles.containerOrcamentos} contentContainerStyle={styles.contentContainerOrcamentos}>
                {orcamentos.map((orcamento, index) => (
                    <ItemOrcamento
                        key={index}
                        navigation={navigation}
                        dia={orcamento[0].substring(0,2)}
                        mes={NumberInMonth(parseInt(orcamento[0].substring(3,5)),'S')}
                        horaInicio={`${orcamento[1].substring(0,2)}:${orcamento[1].substring(2,4)}`}
                        horaFinal={`${orcamento[2].substring(0,2)}:${orcamento[2].substring(2,4)}`}
                        valor={orcamento[3].replace('.',',')}
                        nome={`${orcamento[6]} ${orcamento[7]}`}
                        media={orcamento[8]}
                        avaliacoes={orcamento[9]}
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

export default OrcamentosScreen;