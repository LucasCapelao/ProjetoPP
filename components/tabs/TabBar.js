import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import ChatScreen from '../ChatScreen.js';
import SolicitacoesScreen from '../SolicitacoesScreen.js';
import HomeScreenView from '../GroupScreens/HomeScreens/HomeScreenView.js';

const Tab = createBottomTabNavigator();

export default function TabBar(navigation) {
  return (
    <Tab.Navigator
    tabBarOptions={{ 
    inactiveTintColor: '#E2DA1A', 
    activeTintColor: '#E2DA1A', 
    showLabel: false, 
    tabStyle:{ backgroundColor: 'black', position: 'relative', height: 80, justifyContent: 'space-around' },}}>
        <Tab.Screen name="Home" component={HomeScreenView} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Entypo name="home" size={40} color={color}/>), }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="chat" size={40} color={color} />), }} />
        <Tab.Screen name="Solicitacoes" component={SolicitacoesScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="all-inbox" size={40} color={color} />), }} />
    </Tab.Navigator>

  );
}