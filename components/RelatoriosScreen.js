import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import SolicitacoesScreen from '../components/SolicitacoesScreen.js';
import ChatScreen from '../components/ChatScreen.js';
import HomeScreenContent from '../components/HomeScreen.js';
import RelatoriosDetailsScreen from '../components/RelatoriosDetailsScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons, Octicons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';

const corAmarela = '#E2DA1A';

const RelatoriosScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
       <View style={styles.headerScreen}>
          <Text style={styles.textHeaderScreen}>Relatórios</Text>
        </View>
        <Text style={{color:'white'}}>Tela Resolvida, navegacao correta, seguir para react native echarts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerScreen:{
    width: '90%',
    backgroundColor: corAmarela,
    height: '12%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
},
textHeaderScreen:{
    fontSize: 28,
    fontWeight: 'bold',
},
});

export default RelatoriosScreen;
