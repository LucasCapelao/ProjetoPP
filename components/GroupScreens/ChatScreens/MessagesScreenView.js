import React, {useEffect,useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './ChatScreen';
// import MessagesScreenContent from './MessagesScreenContent2';
import MessagesScreenContent from './MessagesScreenContent';

const Stack = createStackNavigator();

export default function MessagesScreenView() {
    return (
        <Stack.Navigator options={{ headerShown: false}}>
          <Stack.Screen name="MessagesScreen" component={MessagesScreenContent} options={{ headerShown: false}}/>
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false}}/>
        </Stack.Navigator>
    );
  }