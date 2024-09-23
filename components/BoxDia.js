import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corCinzaPrincipal, IpAtual, corAmarela } from '../src/Constants/Constantes';

export default function BoxDia({navigation,dia,diaSemana,mes}){
    const [eventosPorDia, setEventosPorDia] = useState([])

    async function buscaEventosPorDia(){
        try {
            let idFirebase = window.idFirebaseGlobal
            const response = await fetch(`http://${IpAtual}:3003/buscaEventosPorDia?mes=${mes}&idFirebase=${idFirebase}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setEventosPorDia(data[0])
            console.log('Resultado da consulta:', data);
        } catch (error) {
            console.error('Consulta erro busca eventos por mes:', error);
        }
    }

    useEffect(() => {
        buscaEventosPorDia()
    }, []);

    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('DetailsDiaScreen',{mes:mes,dia:dia})}} style={{ width: 65, height: 70, backgroundColor: corCinzaPrincipal, borderRadius: 10, alignItems: 'center',justifyContent:'center', marginTop: 10}}>
            {eventosPorDia[dia-1] > 0 && (
                <View style={styles.notificacaoMes}>
                    <Text>{eventosPorDia[dia-1]}</Text>
                </View>
            )}
            <Text style={{color: 'white',fontWeight:300, fontSize: 22}}>{dia}</Text>
            <Text style={{color: 'white',fontWeight:300, fontSize: 14}}>{diaSemana}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    notificacaoMes:{
        backgroundColor: corAmarela, 
        width:23,
        height:23,
        borderRadius:'100%', 
        position: 'absolute', 
        top: -5,
        right:-0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

