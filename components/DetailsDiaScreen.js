import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { corAmarela } from '../src/Constants/Constantes';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import BoxEvento from './BoxEvento';
import { IpAtual } from '../src/Constants/Constantes';


const DetailsDiaScreen = ({ navigation, route }) => {
    const {mes} = route.params;
    const {dia} = route.params;
    const [eventos,setEventos] = useState([]);
    const [reload, setReload] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function buscaEventos() {
        let idFirebase = window.idFirebaseGlobal
        console.log(mes)
        console.log(dia)
        try {
            const response = await fetch(`http://${IpAtual}:3003/buscaEventos?idFirebase=${idFirebase}&mes=${mes}&dia=${dia}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Resultado da consulta:', data);
            setEventos(data);
        } catch (error) {
            console.error('Consulta erro busca eventos:', error);
        }
    }
//            setReload(prevReload => !prevReload);

    async function cancelarEvento(pId){
        const id = pId
        try {
            const response = await fetch(`http://${IpAtual}:3003/cancelarEvento?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setReload(prevReload => !prevReload);
            console.log('Resultado do update:', data);
        } catch (error) {
            console.error('Erro update evento:', error);
        }
    }
    useEffect(() => {
        buscaEventos().then(() => setRefreshing(false));
      }, [reload]);

    const onRefresh = () => {
        setRefreshing(true);
        setReload(prevReload => !prevReload); // Alterna o estado de 'reload' para forçar a recarga
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>{dia} de {mes}</Text>
            </View>
            <View style={styles.containerHeaderEventos}>
                <Text style={{color:'white', fontSize:28, fontWeight: 700}}>Eventos</Text>
                <TouchableOpacity style={{width:30, height:30, backgroundColor: corAmarela, borderRadius: '100%', justifyContent:'center',alignItems:'center'}} onPress={()=>{navigation.navigate('AdicionarEventoScreen')}}>
                    <Entypo name="plus" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{width:'90%',backgroundColor: corAmarela,height:1}}></View>
            <ScrollView style={styles.containerEventos} contentContainerStyle={styles.contentScrollview} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={corAmarela} />}>
            {eventos.map((evento, index) => (
                <BoxEvento
                    navigation={navigation}
                    horaInicio={`${evento[3].substring(0,2)}:${evento[3].substring(2,4)}`}
                    horaFinal={`${evento[4].substring(0,2)}:${evento[4].substring(2,4)}`}
                    nomeCompleto={`${evento[7]} ${evento[8]}`}
                    endereco={`${evento[13]}, ${evento[14]}, ${evento[12]}, ${evento[11]} - ${evento[10]}`}
                    situacao={evento[6]}
                    descricao={evento[5]}
                    idEvento={evento[0]}
                    onUpdateCancelar={() => cancelarEvento(evento[0])}
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
    containerHeaderEventos:{
        width: '90%',
        height: 40,
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
        // backgroundColor: 'red'
    },
    containerEventos:{
        width: '90%',
        marginTop: 40,
        // height: '60%',
        // backgroundColor: 'green'
    },
    contentScrollview:{
        alignItems: 'center'
    }
});

export default DetailsDiaScreen;