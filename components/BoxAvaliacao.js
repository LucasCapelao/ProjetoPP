import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { corCinzaPrincipal,userIcon,corAmarela, corCinzaTerciaria, corCinzaSecundaria } from '../src/Constants/Constantes';
import Entypo from '@expo/vector-icons/Entypo';

const BoxAvaliacoes = ({ navigation, nomeCompleto, notaAvaliacao, data }) => {
    return (
        <View style={{ backgroundColor: corCinzaPrincipal, alignItems:'center', width: 350, height:60, marginTop:10, flexDirection:'row',display:'flex', borderRadius:10 }}>
            <Image style={{width:40,height:40, marginLeft:20}} source={userIcon} />
            <Text style={{color:'white',fontSize:18,marginLeft: 10}}>{nomeCompleto}</Text>
            <Text style={{color:corCinzaSecundaria, fontSize:12,position:'absolute', top:42, left:216}}>há {data} dias</Text>
            <View style={{backgroundColor:corCinzaPrincipal,position:'absolute',right:0,flexDirection:'row',alignItems:'center',width:70, height:'100%',backgroundColor:corCinzaTerciaria,borderTopRightRadius:10,borderBottomRightRadius:10,justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'white'}}>{notaAvaliacao}</Text>
                <Entypo name="star" size={25} color={corAmarela} />
            </View>
        </View>
    );
};

export default BoxAvaliacoes;