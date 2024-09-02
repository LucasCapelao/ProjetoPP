import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabBar from './tabs/TabBarContratante';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {TabBar} from './tabs/TabBar.js';

const Stack = createStackNavigator();

const TabBarContratanteView = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
        <TabBar></TabBar>
    </NavigationContainer>
  );
};

export default TabBarContratanteView;