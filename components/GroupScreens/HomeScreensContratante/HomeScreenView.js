import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenContent from './HomeScreenContent.js';
import TabBar from '../../tabs/TabBarContratante.js';
import ConfiguracoesScreen from '../../ConfiguracoesScreen.js';
import BuscarScreen from '../../BuscarScreen.js';

const Stack = createStackNavigator();

export default function HomeScreenView() {
    return (
    //   <NavigationContainer independent={true}>
        <Stack.Navigator options={{ headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreenContent} options={{ headerShown: false}}/>
          <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false}}/>
          <Stack.Screen name="Buscar" component={BuscarScreen} options={{headerShown: false }}/>
          <Stack.Screen name="ConfiguracoesScreen" component={ConfiguracoesScreen} options={{ headerShown: false}}/>
        </Stack.Navigator>
    //   </NavigationContainer>
    );
  }