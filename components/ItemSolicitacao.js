import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria, userIcon, corVerdeIcon, corVermelhaIcon} from '../src/Constants/Constantes.js';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function ItemSolicitacao(props){
  return (
    <View style={styles.container}>
        <View style={styles.boxCabecalho}>
            <Image style={styles.userIcon} source={userIcon} />
            <Text style={{color: 'white', fontSize: 18}}>{props.nome}</Text>
        </View>
        <View style={styles.boxInfos}>
            <View style={styles.boxLeft}>
                <Text style={{color:corAmarela, fontSize:40, fontWeight:800}}>{props.dia}</Text>
                <Text style={{color:corAmarela, fontSize:35, fontWeight:300, marginTop:-20}}>{props.mes}.</Text>
            </View>
            <View style={styles.boxCenter}>
                <View style={styles.boxEndereco}>
                    <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{props.endereco}</Text>
                </View>
                <View style={styles.boxActions}>
                    <View style={{backgroundColor: corCinzaTerciaria, width: 70, height: 40, borderRadius: 4, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: 300}}>{props.horario}</Text>
                    </View>
                    <TouchableOpacity style={styles.coverActions}>
                        <Ionicons name="time" size={28} color={corAmarela} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.coverActions}>
                        <Ionicons name="calendar-sharp" size={28} color={corAmarela} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.boxRight}>
                <TouchableOpacity style={styles.coverActions}> 
                    <FontAwesome name="check-circle" size={28} color={corVerdeIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.coverActions}>
                    <MaterialIcons name="cancel" size={28} color={corVermelhaIcon} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        width: '90%',
        height: 180,
        backgroundColor: corCinzaPrincipal,
        borderRadius: 10
    },
    boxCabecalho:{
        width: '100%',
        height: '30%',
        backgroundColor: corCinzaTerciaria,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    boxInfos:{
        width: '100%',
        height: '70%',
        display: 'flex',
        flexDirection: 'row'
    },
    userIcon:{
        width: 40,
        height: 40,
        margin: 10
    },
    boxLeft:{
        width: '26%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: corCinzaTerciaria,
        borderRightWidth: 1
    },
    boxCenter:{
        width: '54%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxRight:{
        width: '20%', 
        // backgroundColor: 'pink', 
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderLeftColor: corCinzaTerciaria,
        borderLeftWidth: 1
    },
    boxEndereco:{
        width: '90%',
        height: 60,
        // backgroundColor: 'green',
        marginBottom: 5
    },
    boxActions:{
        width: '90%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    coverActions:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: corCinzaTerciaria,
        borderRadius: 4
    }
})
