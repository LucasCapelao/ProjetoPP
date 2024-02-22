// HomeScreen.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import SolicitacoesScreen from '../components/SolicitacoesScreen.js';
import ChatScreen from '../components/ChatScreen.js';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const corAmarela = '#E2DA1A';

const HomeScreen = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
          tabBarOptions={{ inactiveTintColor: '#E2DA1A' , activeTintColor: '#E2DA1A', showLabel: false, labelStyle: { fontSize: 15, }, tabStyle:{ backgroundColor: 'black', position: 'relative', height: 80 }, }}>
        <Tab.Screen name="Home" component={HomeScreenContent} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Entypo name="home" size={40} color={color}/>), }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="chat" size={40} color={color} />), }} />
        <Tab.Screen name="Solicitacoes" component={SolicitacoesScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="all-inbox" size={40} color={color} />), }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeScreenContent = ({ navigation }) => {
  return (
    
    <View style={{ flex: 1, backgroundColor:'black' }}>
      <View style={styles.headerScreen}>
        <Text style={styles.titleHeader}>Olá, Lucas</Text>
        <TouchableOpacity style={styles.boxIconExit} onPress={()=>{alert('ok')}}>
          <MaterialCommunityIcons name="exit-to-app" size={40} color="#E2DA1A" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.containerDados}>

        </View>
        <View style={styles.lineOptions}>
          <TouchableOpacity style={styles.boxLineOptions}>
            <FontAwesome name="star" size={36} color={corAmarela} />
            <Text style={{color: corAmarela}}>Avaliações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxLineOptions}>
            <Octicons name="history" size={36} color={corAmarela} />
            <Text style={{color: corAmarela}}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxLineOptions}>
            <FontAwesome name="search" size={36} color={corAmarela} />
            <Text style={{color: corAmarela}}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxLineOptions}>
            <Ionicons name="settings-sharp" size={36} color={corAmarela} />
            <Text style={{color: corAmarela}}>Config.</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.containerActions}>
          <FontAwesome5 name="calendar-alt" size={53} color={corAmarela} />
          <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Minha Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerActions}>
          <MaterialIcons name="analytics" size={55} color={corAmarela} />
          <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerActions}>
          <FontAwesome5 name="cart-plus" size={44} color={corAmarela} />
          <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Novo Orçamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerScreen:{
    width: '100%',
    height: '12%',
    // backgroundColor: 'green',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleHeader:{
    fontSize: 26,
    color: 'white',
    marginLeft: 10
  },
  boxIconExit:{
    width: 40,
    height: 40,
    marginRight: 10
  },
  body:{
    width: '100%',
    height:'88%',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  containerDados:{
    backgroundColor: '#E2DA1A',
    width: '94%',
    height: '25%',
    borderRadius: 10
  },
  lineOptions:{
    width: '94%',
    height: 80,
    // backgroundColor: 'green',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15
  },
  boxLineOptions:{
    width: '23%',
    height:80,
    backgroundColor: '#20201C',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  containerActions:{
    width: '94%',
    height: '17.3%',
    marginBottom: 15,
    backgroundColor: '#20201C',
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 40,
    flexDirection: 'row'
  }

})

export default HomeScreen;
