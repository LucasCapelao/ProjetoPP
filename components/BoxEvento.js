import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria } from '../src/Constants/Constantes';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const BoxEvento = ({ navigation, horaInicio, horaFinal, nomeCompleto, endereco, descricao, idEvento, situacao, onUpdateCancelar }) => {
    return (
        <View style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'center',marginBottom:30}}>
            <View style={{ width: '90%', height: 110, backgroundColor: corCinzaPrincipal,flexDirection:'row',alignItems:'center', borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
                <View style={{width:'35%',height:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.textHora}>{horaInicio}</Text>
                    <View style={{width: 3, height: 16, backgroundColor: corAmarela}}></View>
                    <Text style={styles.textHora}>{horaFinal}</Text>
                </View>
                <View style={{width: 1, height: '86%', backgroundColor: 'white'}}></View>
                <View style={{width: '62%', height: '100%', marginLeft: '1%', marginRight: '1%',flexDirection:'column'}}>
                    <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginTop:10, marginLeft:10}}>{nomeCompleto}</Text>
                    <Text style={{color:corCinzaSecundaria,fontSize:12,fontWeight:'bold',marginLeft:10}}>{endereco}</Text>
                    <Text style={{marginTop: 10,marginLeft:10,color:corAmarela,fontSize:12, fontWeight:'bold'}}>{descricao}</Text>
                </View>
            </View>
            <View style={{width:'90%',height:50,backgroundColor:corCinzaTerciaria,borderBottomRightRadius: 10, borderBottomLeftRadius: 10,alignItems:'center', justifyContent:'space-between',flexDirection:'row'}}>
                <View style={{width: 100, height: 18, marginLeft: 30,borderRadius:'100%', alignItems:'center',justifyContent:'center',backgroundColor:'black'}}>
                    <Text style={{color:corAmarela, fontSize:12,fontWeight:'bold'}}>{situacao}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', width:100}}>
                <TouchableOpacity style={{marginRight:10}}>
                    <AntDesign name="infocirlce" size={24} color={corAmarela} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="edit" size={24} color={corAmarela} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:10,marginRight:40}} onPress={() => onUpdateCancelar(idEvento)}>
                    <MaterialIcons name="cancel" size={24} color={corAmarela} />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textHora:{
        fontSize: 26,
        fontWeight: '800',
        color: 'white'
    }
});

export default BoxEvento;