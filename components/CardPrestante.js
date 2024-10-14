import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria, userIcon } from '../src/Constants/Constantes';
import NumberInCategoryIcon from '../src/functions/NumberInCategoryIcon';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Ionicons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';


export const CardPrestante = ({ navigation, fotoPerfil, nome, sobrenome, dataNascimento, especialidade, avaliacoes, media, idFirebasePrestante }) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('DetailsPrestante',{nome:nome,sobrenome:sobrenome,dataNascimento:dataNascimento,avaliacoes:avaliacoes,media:media,idFirebasePrestante:idFirebasePrestante,especialidade:especialidade})} style={{ backgroundColor: corCinzaPrincipal, alignItems:'center', width: '100%', height: 130, borderRadius: 10 }}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', margin: 10}}>
                <Image source={userIcon} style={{width: 30, height: 30, marginLeft: 10}} />
                <Text style={{color:'white', fontSize: 18, marginLeft: 10}}>{nome} {sobrenome}</Text>
                <TouchableOpacity style={{position: 'absolute', right: 20}}>
                    <MaterialIcons name="chat" size={30} color={corAmarela} />
                </TouchableOpacity>
            </View>
            <View style={{height: 1, width: '95%', backgroundColor: 'white'}}></View>
            <View style={{width: '100%', flexDirection: 'row'}}>
                <View style={{width: '30%', height: '100%', alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:50, height: 50, alignItems:'center', justifyContent:'center', backgroundColor: corCinzaTerciaria, borderRadius: 10}}>
                        <NumberInCategoryIcon pCategoria={especialidade} />
                    </View>
                </View>
                <View style={{width: '70%', height: '100%', justifyContent:'center'}}>
                    {
                        avaliacoes===0
                        ?<Text style={{color: corCinzaSecundaria, fontSize:18, position:'absolute', right: 15}}>Nenhuma Avaliação</Text>
                        :<Text style={{color: corCinzaSecundaria, fontSize:18, position:'absolute', right: 15}}>{media} | {avaliacoes} Avalições</Text>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

});

