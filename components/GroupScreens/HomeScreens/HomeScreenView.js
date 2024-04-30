import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenContent from './HomeScreenContent.js';
import RelatoriosScreen from '../../RelatoriosScreen.js';
import RelatoriosDetailsScreen from '../../RelatoriosDetailsScreen.js';
import LoginScreen from '../../LoginScreen.js';
import App from '../../../App.js';
import TabBar from '../../tabs/TabBar.js';

const Stack = createStackNavigator();

export default function HomeScreenView() {
    return (
    //   <NavigationContainer independent={true}>
        <Stack.Navigator options={{ headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreenContent} options={{ headerShown: false}}/>
          <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false}}/>
          <Stack.Screen name="Relatorios" component={RelatoriosScreen} options={{headerShown: false }}/>
          <Stack.Screen name="RelatoriosDetails" component={RelatoriosDetailsScreen} options={{ headerShown: false}}/>
          {/* <Stack.Screen name="App" component={App} options={{ headerShown: false}}/> */}
        </Stack.Navigator>
    //   </NavigationContainer>
    );
  }