import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria, corVerdeIcon, userIcon } from '../src/Constants/Constantes';
import Ionicons from '@expo/vector-icons/Ionicons';

export const ItemOrcamento = ({ navigation, dia, mes, horaInicio, horaFinal, valor, nome, media, avaliacoes, fotoPerfil }) => {
    function goToDetails(){
        // navigation.navigate('DetailsOrcamento')
    }

    return (
        <TouchableOpacity onPress={()=>goToDetails()} style={{ width:'100%', backgroundColor: corCinzaPrincipal, height: 120, marginBottom: 10, borderRadius: 10, alignItems: 'center' }} >
            <View style={{width: '92%', height:45, marginTop: 5, flexDirection:'row', alignItems:'center', borderBottomColor: 'white', borderBottomWidth: 1}}>
                <Text style={{color:corAmarela, fontSize: 20, fontWeight: 'bold'}}>{dia} de {mes}</Text>
                <View style={{width: 1, height: 30, backgroundColor:'white', marginLeft: 10}}></View>
                <View style={{marginLeft:10, alignItems:'center'}}>
                    <Text style={{color:'white', fontSize: 15, fontWeight:'bold'}}>{horaInicio}</Text>
                    <Text style={{color:'white', fontSize: 15, fontWeight:'bold'}}>{horaFinal}</Text>
                </View>
                <View style={{width: 1, height: 30, backgroundColor:'white', marginLeft: 10}}></View>
                <Text style={{color:corVerdeIcon, fontSize: 18, fontWeight: 'bold', marginLeft: 10}}>R$ {valor}</Text>
            </View>
            <View style={{width: '92%', marginTop: 10, flexDirection: 'row'}}>
                <Image source={{uri: fotoPerfil}} style={{width: 40, height: 40, borderRadius: 10}} />
                <View style={{marginLeft: 12}}>
                    <Text style={{color:'white', fontSize: 16}}>{nome}</Text>
                    <Text style={{color: corCinzaSecundaria}}>{media} | {avaliacoes} Avaliações</Text>
                </View>
            </View>
            <Ionicons style={{position:'absolute', right: 10, bottom: 10}} name="open-outline" size={24} color={corAmarela} />
        </TouchableOpacity>
    );
};