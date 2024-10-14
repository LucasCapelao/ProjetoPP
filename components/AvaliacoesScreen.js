import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corAmarela, corCinzaPrincipal } from '../src/Constants/Constantes';
import Entypo from '@expo/vector-icons/Entypo';
import { IpAtual } from '../src/Constants/Constantes';
import BoxAvaliacoes from './BoxAvaliacao';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const AvaliacoesScreen = ({ navigation, route }) => {
    const [avaliacoes,setAvaliacoes] = useState([])
    const [avaliacaoMedia,setAvaliacaoMedia] = useState(0)
    const [totalAvaliacoes,setTotalAvaliacoes] = useState(0)
    const { telaOrigem } = route.params;
    const { idFirebaseTelaOrigem } = route.params;

    const voltarTelaOrigem = () =>{
        // navigation.navigate(`'${telaOrigem}'`)
        navigation.goBack()
    }

    async function buscaAvaliacoes() {
        let idFirebase
        if(idFirebaseTelaOrigem != null){
            console.log('entrou if')
            console.log(idFirebaseTelaOrigem)
            idFirebase = idFirebaseTelaOrigem;
        }else{
            idFirebase = window.idFirebaseGlobal;
        }
        console.log(idFirebase)
        try {
            const response = await fetch(`http://${IpAtual}:3003/buscaAvaliacoes?idFirebase=${idFirebase}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Resultado da consulta:', data);
            setAvaliacoes(data);
            setTotalAvaliacoes(data[0][3])
            let media = 0;
            data.forEach(linha => {
                let valorNumerico = parseFloat(linha[2].toString().replace(",", "."));
                media += valorNumerico;
            });
            let mediaArredondada = media / data.length
            setAvaliacaoMedia(mediaArredondada.toString().substring(0,3))

        } catch (error) {
            console.error('Consulta erro busca avaliacoes:', error);
        }
    }

    useEffect(() => {
        buscaAvaliacoes();
      }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>Avaliações</Text>
              {telaOrigem!=null
              ?<TouchableOpacity onPress={()=>voltarTelaOrigem()} style={{position:'absolute', left:0, width: 40, height:'100%', borderRighttColor: corCinzaPrincipal, borderRightWidth: 1, alignItems:'center', justifyContent:'center'}}>
                <AntDesign name="left" size={24} color='black' />
              </TouchableOpacity>
              :<></>
              }
            </View>
            <View style={{marginTop:20,backgroundColor:corCinzaPrincipal,width: '90%',height:140, borderRadius:10, flexDirection:'row'}}>
                <View style={{width:'50%',alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'column'}}>
                    <Text style={{color:corAmarela,fontSize:16,fontWeight:'bold',marginBottom:10}}>Avaliação Média</Text>
                    <View style={{flexDirection:'row',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'white',fontSize:38,fontWeight:'bold',marginRight:10}}>{avaliacaoMedia}</Text>
                        <Entypo name="star" size={38} color={corAmarela} />
                    </View>
                </View>
                <View style={{width:'50%',alignItems:'center',flexDirection:'column', height:'100%', justifyContent:'center'}}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:corAmarela}}>Total de Avaliações</Text>
                    <Text style={{color:'white',fontSize:38,fontWeight:'bold'}}>{totalAvaliacoes}</Text>
                </View>
            </View>
            <ScrollView>
                {avaliacoes.map((avaliacao,index)=>(
                    <BoxAvaliacoes
                        key={index}
                        nomeCompleto={`${avaliacao[4]} ${avaliacao[5]}`}
                        notaAvaliacao={avaliacao[2]}
                        data={`${avaliacao[1].toString().substring(0,1)}`}
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
});

export default AvaliacoesScreen;