import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const corAmarela = '#E2DA1A';
const corCinzaPrincipal = '#20201C';
const logoIntroducao = require('../assets/6.png')

export default function IntroducaoScreen({navigation}){
    const nextScreen = () =>{
        navigation.navigate('LoginScreen');
    }

    return(
        <View style={styles.container}>
            <View style={styles.regionTop}>
                <Text style={styles.title}>Seja Bem-Vindo</Text>
            </View>
            <View style={styles.regionLeft}>
                <Text style={styles.textNormal}>Olá, este aplicativo foi feito para <Text style={styles.textAmarelo}>anuncio e aquisição de serviços informais domésticos</Text></Text>
            </View>
            <View style={styles.regionRight}>
                <Text style={styles.textNormalRight}>Você pode se cadastrar tanto como um <Text style={styles.textAmarelo}>coolaborador</Text> quanto como um <Text style={styles.textAmarelo}>contratante</Text></Text>
            </View>
            <Image style={styles.logoIntroducao} source={logoIntroducao}></Image>
            <TouchableOpacity style={styles.btnLoginAmarelo} onPress={nextScreen}>
                <Text style={styles.textBtnAmarelo}>Vamos Começar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    regionTop:{
        width: '88%',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingBottom: 10,
        borderBottomColor: corAmarela,
        borderBottomWidth: 1
    },
    title:{
        color: corAmarela,
        fontSize: 30,
        fontWeight: 'bold'
    },
    regionLeft:{
        width: '100%',
        paddingLeft: 30,
        paddingRight: 60,
        marginTop: 20
    },
    textNormal:{
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold'
    },
    textNormalRight:{
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    textAmarelo:{
        fontSize: 28,
        color: corAmarela,
        fontWeight: 'bold'
    },
    regionRight:{
        width: '100%',
        paddingRight: 30,
        paddingLeft: 60,
        marginTop: 30,
    },
    logoIntroducao:{
        width: '28%',
        height: '28%',
    },
    btnLoginAmarelo:{
        width: '90%',
        height: 60,
        backgroundColor: corAmarela,
        marginTop: 10, 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtnAmarelo:{
        color: corCinzaPrincipal,
        fontSize: 26,
        fontWeight: 'bold'
    }
})