import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria } from '../src/Constants/Constantes';
import Entypo from '@expo/vector-icons/Entypo';
import { NumberInMonth } from '../src/functions/NumberInMonth';

const AgendaScreen = ({ navigation }) => {
    const [eventosPorMes, setEventosPorMes] = useState([])

    async function buscaEventosPorMes(){
        try {
            let idFirebase = window.idFirebaseGlobal
            const response = await fetch(`http://${IpAtual}:3003/buscaEventosPorMes?idFirebase=${idFirebase}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setEventosPorMes(data[0])
            console.log('Resultado da consulta:', data);
        } catch (error) {
            console.error('Consulta erro busca eventos por mes:', error);
        }
    }

    useEffect(() => {
        buscaEventosPorMes()
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
           <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>Minha Agenda</Text>
            </View>
            <View style={styles.containerMes}>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:1})}}>
                    <Text style={styles.textMes}>{NumberInMonth(1,'N')}</Text>
                    {eventosPorMes[0] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[0]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:2})}}>
                    <Text style={styles.textMes}>{NumberInMonth(2,'N')}</Text>
                    {eventosPorMes[1] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[1]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:3})}}>
                    <Text style={styles.textMes}>{NumberInMonth(3,'N')}</Text>
                    {eventosPorMes[2] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[2]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:4})}}>
                    <Text style={styles.textMes}>{NumberInMonth(4,'N')}</Text>
                    {eventosPorMes[3] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[3]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:5})}}>
                    <Text style={styles.textMes}>{NumberInMonth(5,'N')}</Text>
                    {eventosPorMes[4] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[4]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:6})}}>
                    <Text style={styles.textMes}>{NumberInMonth(6,'N')}</Text>
                    {eventosPorMes[5] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[5]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:7})}}>
                    <Text style={styles.textMes}>{NumberInMonth(7,'N')}</Text>
                    {eventosPorMes[6] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[6]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:8})}}>
                    <Text style={styles.textMes}>{NumberInMonth(8,'N')}</Text>
                    {eventosPorMes[7] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[7]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:9})}}>
                    <Text style={styles.textMes}>{NumberInMonth(9,'N')}</Text>
                    {eventosPorMes[8] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[8]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:10})}}>
                    <Text style={styles.textMes}>{NumberInMonth(10,'N')}</Text>
                    {eventosPorMes[9] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[9]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:11})}}>
                    <Text style={styles.textMes}>{NumberInMonth(11,'N')}</Text>
                    {eventosPorMes[10] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[10]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:12})}}>
                    <Text style={styles.textMes}>{NumberInMonth(12,'N')}</Text>
                    {eventosPorMes[11] > 0 && (
                        <View style={styles.notificacaoMes}>
                            <Text>{eventosPorMes[11]}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.containerAdd} onPress={()=>{navigation.navigate('AdicionarEventoScreen')}}>
                <Entypo name="plus" size={42} color="black" />
            </TouchableOpacity>
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
    containerMes:{
        width: '94%',
        height: '60%',
        marginTop: 40,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row'
        // backgroundColor: 'green'
    },
    boxMes:{
        width: 100,
        height: 100,
        backgroundColor: corCinzaPrincipal,
        margin: 7,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerAdd:{
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: corAmarela
    },
    textMes:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    notificacaoMes:{
        backgroundColor: corAmarela, 
        width:25,
        height:25,
        borderRadius:'100%', 
        position: 'absolute', 
        top: -5,
        right:-5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AgendaScreen;