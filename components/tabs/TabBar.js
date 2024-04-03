import React from 'react';
// import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
// import SolicitacoesScreen from '../components/SolicitacoesScreen.js';
// import ChatScreen from './components/ChatScreen.js';
// import RelatoriosScreen from '../components/RelatoriosScreen.js';
// import RelatoriosDetailsScreen from '../components/RelatoriosDetailsScreen.js';
// import LoginScreen from '../components/LoginScreen.js';
// import App from '../App.js';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import ChatScreen from '../ChatScreen.js';
import SolicitacoesScreen from '../SolicitacoesScreen.js';
import ScreenView from '../HomeScreen.js';
// import {getAuth, signOut } from 'firebase/auth';
// import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';


const Tab = createBottomTabNavigator();

export default function TabBar(navigation) {
  return (
    <Tab.Navigator
    tabBarOptions={{ 
    inactiveTintColor: '#E2DA1A', 
    activeTintColor: '#E2DA1A', 
    showLabel: false, 
    tabStyle:{ backgroundColor: 'black', position: 'relative', height: 80, justifyContent: 'space-around' },}}>
        <Tab.Screen name="Home" component={ScreenView} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Entypo name="home" size={40} color={color}/>), }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="chat" size={40} color={color} />), }} />
        <Tab.Screen name="Solicitacoes" component={SolicitacoesScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="all-inbox" size={40} color={color} />), }} />
    </Tab.Navigator>
  );
}