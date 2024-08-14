import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corAmarela } from '../src/Constants/Constantes';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import BoxEvento from './BoxEvento';
import { BoxplotChart } from 'echarts/charts';


const DetailsDiaScreen = ({ navigation, route }) => {
    const {mes} = route.params;
    const {dia} = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>{dia} de {mes}</Text>
            </View>
            <View style={styles.containerHeaderEventos}>
                <Text style={{color:'white', fontSize:28, fontWeight: 700}}>Eventos</Text>
                <TouchableOpacity style={{width:30, height:30, backgroundColor: corAmarela, borderRadius: '100%', justifyContent:'center',alignItems:'center'}}>
                    <Entypo name="plus" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{width:'90%',backgroundColor: corAmarela,height:1}}></View>
            <ScrollView style={styles.containerEventos} contentContainerStyle={styles.contentScrollview}>
                <BoxEvento></BoxEvento>
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