import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabBar from './tabs/TabBar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {TabBar} from './tabs/TabBar.js';

const Stack = createStackNavigator();

const TesteTab = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
        <TabBar></TabBar>
    </NavigationContainer>
  );
};

const TesteContent = ({ navigation, route }) => {
    return(
        <View style={{color: 'white'}}>
            Teste Screen Content
        </View>
    )
}

export default TesteTab;