import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria, userIcon } from '../src/Constants/Constantes';
import { calcularIdade } from '../src/functions/CalculaIdade.js';
import NumberInCategoryIcon from '../src/functions/NumberInCategoryIcon.js';
import {NumberInCategory} from '../src/functions/NumberInCategory.js'
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';


export const DetailsPrestante = ({ navigation, route }) => {
    const { nome } = route.params;
    const { sobrenome } = route.params;
    const { dataNascimento } = route.params;
    const { media } = route.params;
    const { avaliacoes } = route.params;
    const { idFirebasePrestante }  = route.params;
    const { especialidade } = route.params;
    const { fotoPerfil } = route.params;
    console.log(avaliacoes)
    console.log(media)
    console.log(idFirebasePrestante)

    const irParaAvaliacoes = () => {
        navigation.navigate('AvaliacoesScreen',{telaOrigem:'DetailsPrestanteScreen',idFirebaseTelaOrigem:idFirebasePrestante})
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={{width: '90%', height: 170, backgroundColor: corCinzaPrincipal, marginTop: '10%', borderRadius: 10, flexDirection: 'row', alignItems:'center'}}>
                <Image source={{ uri:fotoPerfil }} style={{width: '35%', height: 120, marginLeft: 20, borderRadius: 10}} />
                <View style={{padding: 15, height: 120, width: '65%'}}>
                    <Text style={{color: corAmarela, fontSize: 16}}><Text style={{color: corAmarela, fontSize: 18, fontWeight: 'bold'}}>{nome}</Text> {sobrenome}</Text>
                    <Text style={{color: corAmarela, fontSize: 18, fontWeight: 'bold'}}>{calcularIdade(dataNascimento)} Anos<Text style={{color: corCinzaSecundaria, fontSize: 12}}> ({dataNascimento})</Text></Text> 
                    <View style={{marginLeft: 10, flexDirection:'row', alignItems: 'center', position:'absolute', bottom: 0, justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight:'bold', color: corAmarela}} ><Entypo name="star" size={25} color={corAmarela} />{media}</Text>
                        <Text style={{color: corCinzaSecundaria, fontSize: 14, marginLeft: 20, marginTop: 5}}>{avaliacoes} Avaliações</Text>
                    </View>
                </View>
            </View>
            <View style={{width: '90%', marginTop:20}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Especialidades</Text>
            </View>
            <View style={{width: '90%', height: 80, backgroundColor:corCinzaPrincipal, marginTop: 10, justifyContent:'center', borderRadius:10}}>
                <View style={{width:70, height:70, backgroundColor:corCinzaTerciaria, alignItems:'center', justifyContent:'center', marginLeft:5, borderRadius: 7}}>
                    <Text style={{color:corAmarela, fontSize:16}}>{NumberInCategory(especialidade)}</Text>
                    <NumberInCategoryIcon pCategoria={especialidade} />
                </View>
            </View>
            <TouchableOpacity style={{width:'90%', height:50, backgroundColor:corCinzaPrincipal, borderRadius:10, alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop: 7}}>
                <Text style={{fontSize: 18, color:'white', marginLeft: 30}}>Histórico</Text>
                <View style={{width:40, height:50, backgroundColor:corCinzaTerciaria, alignItems:'center', justifyContent:'center', borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <AntDesign name="right" size={20} color={corAmarela} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'90%', height:50, backgroundColor:corCinzaPrincipal, borderRadius:10, alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop: 7}} onPress={irParaAvaliacoes}>
                <Text style={{fontSize: 18, color:'white', marginLeft: 30}}>Avaliações</Text>
                <View style={{width:40, height:50, backgroundColor:corCinzaTerciaria, alignItems:'center', justifyContent:'center', borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <AntDesign name="right" size={20} color={corAmarela} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'90%', height:50, backgroundColor:corCinzaPrincipal, borderRadius:10, alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginTop: 7}}>
                <Text style={{fontSize: 18, color:'white', marginLeft: 30}}>Solicitar Orçamento</Text>
                <View style={{width:40, height:50, backgroundColor:corCinzaTerciaria, alignItems:'center', justifyContent:'center', borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <AntDesign name="right" size={20} color={corAmarela} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'90%', height:60, backgroundColor:corCinzaPrincipal, borderRadius:10, alignItems:'center', justifyContent:'center', flexDirection:'row', marginTop: 7}}>
                <MaterialIcons style={{position:'absolute', left:15}} name="chat" size={30} color={corAmarela} />
                <Text style={{fontSize: 24, color:corAmarela, fontWeight: 'bold'}}>Conversar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});
