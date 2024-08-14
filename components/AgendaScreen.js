import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria } from '../src/Constants/Constantes';
import Entypo from '@expo/vector-icons/Entypo';
import { NumberInMonth } from '../src/functions/NumberInMonth';

const AgendaScreen = ({ navigation }) => {
    function goToDiasMes(pNumeroMes){
        navigation.navigate('DiasMesScreen',pNumeroMes)
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
           <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>Minha Agenda</Text>
            </View>
            <View style={styles.containerMes}>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:1})}}>
                    <Text style={styles.textMes}>{NumberInMonth(1,'N')}</Text>
                    <View style={styles.notificacaoMes}>
                        <Text>10</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:2})}}>
                    <Text style={styles.textMes}>{NumberInMonth(2,'N')}</Text>
                    <View style={styles.notificacaoMes}>
                        <Text>10</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:3})}}>
                    <Text style={styles.textMes}>{NumberInMonth(3,'N')}</Text>
                    <View style={styles.notificacaoMes}>
                        <Text>10</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:4})}}>
                    <Text style={styles.textMes}>{NumberInMonth(4,'N')}</Text>
                    <View style={styles.notificacaoMes}>
                        <Text>10</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:5})}}>
                    <Text style={styles.textMes}>{NumberInMonth(5,'N')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:6})}}>
                    <Text style={styles.textMes}>{NumberInMonth(6,'N')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:7})}}>
                    <Text style={styles.textMes}>{NumberInMonth(7,'N')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:8})}}>
                    <Text style={styles.textMes}>{NumberInMonth(8,'N')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:9})}}>
                    <Text style={styles.textMes}>{NumberInMonth(9,'N')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:10})}}>
                    <Text style={styles.textMes}>{NumberInMonth(10,'N')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:11})}}>
                    <Text style={styles.textMes}>{NumberInMonth(11,'N')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMes} onPress={()=>{navigation.navigate('DiasMesScreen',{numeroMes:12})}}>
                    <Text style={styles.textMes}>{NumberInMonth(12,'N')}</Text>
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