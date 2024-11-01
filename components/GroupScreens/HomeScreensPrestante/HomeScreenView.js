import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenContent from './HomeScreenContent.js';
import RelatoriosScreen from '../../RelatoriosScreen.js';
import RelatoriosDetailsScreen from '../../RelatoriosDetailsScreen.js';
import TabBar from '../../tabs/TabBarPretante.js';
import AgendaScreen from '../../AgendaScreen.js';
import AdicionarEventoScreen from '../../AdicionarEvento.js';
import DiasMesScreen from '../../DiasMesScreen.js';
import DetailsDiaScreen from '../../DetailsDiaScreen.js';
import AvaliacoesScreen from '../../AvaliacoesScreen.js';
import ConfiguracoesScreen from '../../ConfiguracoesScreen.js';

const Stack = createStackNavigator();

export default function HomeScreenView() {
    return (
    //   <NavigationContainer independent={true}>
        <Stack.Navigator options={{ headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreenContent} options={{ headerShown: false}}/>
          <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false}}/>
          <Stack.Screen name="Relatorios" component={RelatoriosScreen} options={{headerShown: false }}/>
          <Stack.Screen name="RelatoriosDetails" component={RelatoriosDetailsScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="AgendaScreen" component={AgendaScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="AdicionarEventoScreen" component={AdicionarEventoScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="DiasMesScreen" component={DiasMesScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="DetailsDiaScreen" component={DetailsDiaScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="AvaliacoesScreen" component={AvaliacoesScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="ConfiguracoesScreen" component={ConfiguracoesScreen} options={{ headerShown: false}}/>
        </Stack.Navigator>
    //   </NavigationContainer>
    );
  }