import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NumberInMonth } from '../src/functions/NumberInMonth';
import { corCinzaPrincipal, corCinzaTerciaria } from '../src/Constants/Constantes';
import BoxDia from './BoxDia';
import { IpAtual } from '../src/Constants/Constantes';

const DiasMesScreen = ({ navigation, route }) => {
    const {numeroMes} = route.params;
    const [dias,setDias] = useState([])

    async function buscaDias() {
        let mes = NumberInMonth(numeroMes,'S').replace('ç','c')
        try {
            const response = await fetch(`http://${IpAtual}:3003/buscaDias?mes=${mes}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Resultado da consulta:', data);
            setDias(data);
        } catch (error) {
            console.error('Consulta erro busca dias:', error);
        }
    }

    useEffect(() => {
        buscaDias()
      }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.containerMesAno}>
                <View style={{width:'85%',height:50,backgroundColor:corCinzaPrincipal,justifyContent:'center',position:'absolute', left: -20,borderTopRightRadius: 10,borderBottomRightRadius: 10}}>
                    <Text style={{color: 'white', fontSize: 24, fontWeight: 800, paddingLeft: 30}}>{NumberInMonth(numeroMes,'S')}</Text>
                </View>
                <View style={{width:'30%',height:30,backgroundColor:corCinzaTerciaria,justifyContent:'center',position:'absolute', left: -20,borderBottomRightRadius: 10,marginTop: 50}}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 400, paddingLeft: 30}}>2024</Text>
                </View>
            </View>
            <ScrollView style={styles.containerDias} contentContainerStyle={styles.contentDias}>
            {dias.map((dia, index) => (
                <BoxDia
                    navigation={navigation}
                    key={index}
                    dia={dia[1]}
                    diaSemana={`${dia[2].substring(0,3)}.`}
                    mes={NumberInMonth(numeroMes,'S')}
                />
            ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerMesAno:{
        width: '90%',
        marginTop: 100,
    },
    containerDias:{
        width: '95%',
        height: '60%',
        marginTop: 130,
        // backgroundColor: 'green',
    },
    contentDias:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

});

export default DiasMesScreen;