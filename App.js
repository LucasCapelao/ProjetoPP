import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen.js';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './components/LoginScreen.js';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroScreen from './components/CadastroScreen.js';
import IntroducaoScreen from './components/IntroducaoScreen.js';
import CadastrarPrestanteScreen from './components/CadastrarPrestanteScreen.js';
import CadastrarContratanteScreen from './components/CadastrarContratanteScreen.js';
import CameraFront from './components/CameraScreen.js';
import RelatoriosScreen from './components/RelatoriosScreen.js';
import TipoUsuarioScreen from './components/TipoUsuarioScreen.js';
import TesteTab from './components/TesteTab.js';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from './src/Constants/Constantes.js';



const statusBarHeight = StatusBar.currentHeight;
const iconLogin = require('./assets/4.png');
console.disableYellowBox = true;

const Stack = createStackNavigator();

const App = ({navigation,route}) => {
  return (
    <NavigationContainer independent={true}>
      <StatusBar hidden></StatusBar>
      <Stack.Navigator initialRouteName="TesteTab" screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="IntroducaoScreen" component={IntroducaoScreen} />
        <Stack.Screen name="CadastrarPrestanteScreen" component={CadastrarPrestanteScreen} />
        <Stack.Screen name="CadastrarContratanteScreen" component={CadastrarContratanteScreen} />
        <Stack.Screen name="CameraFront" component={CameraFront} />
        <Stack.Screen name="RelatoriosScreen" component={RelatoriosScreen} />
        <Stack.Screen name="TipoUsuarioScreen" component={TipoUsuarioScreen} />
        <Stack.Screen name="TesteTab" component={TesteTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corAmarela,
    alignItems: 'center'
  },teste:{color:'white'},
  iconLogin:{
    width: '60%',
    height: '30%',
    marginTop: statusBarHeight
  },
  containerLogin:{
    width: '100%',
    height: '70%',
    backgroundColor: '#000',
    borderTopLeftRadius: '25',
    borderTopRightRadius: '25',
  },
  titleLogin:{
    color: corAmarela,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20
  },
  containerInput:{
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
  },
  backgroundInput:{
    width: '100%',
    height: 50,
    backgroundColor: corCinzaPrincipal,
  },
  coverInput:{
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: corCinzaPrincipal,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputModel:{
    width: '85%',
    height: 30,
    backgroundColor: corCinzaPrincipal,
    borderBottomColor: corAmarela,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: 'white'
  },
  textRedefinir:{
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: -10
  },
  containerBtn:{
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10
  },
  btnLoginCinza:{
    width: '90%',
    height: 60,
    backgroundColor: corCinzaPrincipal,
    marginTop: 10, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
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
  textBtnCinza:{
    color: corAmarela,
    fontSize: 26,
    fontWeight: 'bold'
  },
  textBtnAmarelo:{
    color: corCinzaPrincipal,
    fontSize: 26,
    fontWeight: 'bold'
  }
});
export default App;