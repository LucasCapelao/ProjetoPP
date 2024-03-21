import React from 'react';
import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import SolicitacoesScreen from '../components/SolicitacoesScreen.js';
import ChatScreen from '../components/ChatScreen.js';
import RelatoriosScreen from '../components/RelatoriosScreen.js';
import RelatoriosDetailsScreen from '../components/RelatoriosDetailsScreen.js';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import LoginScreen from '../components/LoginScreen.js';
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { IP_DEBUG } from '@env'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const corAmarela = '#E2DA1A';
const auth = getAuth();
console.log(auth);
// console.log(`id do firebase global: ${window.idFirebaseGlobal}`);

const HomeTabs = ({ navigation }) => {
  return (
      <Tab.Navigator
        tabBarOptions={{ 
        inactiveTintColor: '#E2DA1A' , 
        activeTintColor: '#E2DA1A', 
        showLabel: false, 
        labelStyle: { fontSize: 15, }, 
        tabStyle:{ backgroundColor: 'black', position: 'relative', height: 80 }, 
      }}>
        <Tab.Screen name="Home" component={HomeScreenContent} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Entypo name="home" size={40} color={color}/>), }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="chat" size={40} color={color} />), }} />
        <Tab.Screen name="Solicitacoes" component={SolicitacoesScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcons name="all-inbox" size={40} color={color} />), }} />
      </Tab.Navigator>
  );
};

const HomeScreenContent = ({ navigation, route }) => {
  const teste =()=>{
    navigation.goBack();
  }
  const [indicadorServicos, setIndicadorServico] = useState(0);
    useEffect(() => {
      const consultarRegistros = async () => {
        try {
          const idFirebase = window.idFirebaseGlobal;
          console.log(idFirebase)
          const response = await fetch(`http://${IP_DEBUG}:3000/calculaIndice?idFirebase=${idFirebase}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }});
          const data = await response.json();
          setIndicadorServico(data)
          console.log(`resultado do count: ${data}`);
        } catch (error) {
          console.error('Erro ao consultar registros:', error);
        }
        
      };

      consultarRegistros();
      const twoMinutes = 2 * 60 * 1000; 
      setInterval(() => {
        consultarRegistros();
      }, twoMinutes);
    }, []);
  return (
    <NavigationContainer independent={true}>
    <View style={{ flex: 1, backgroundColor:'black' }}>
      <View style={styles.headerScreen}>
        <Text style={styles.titleHeader}>Olá, Lucas</Text>
        <TouchableOpacity style={styles.boxIconExit} onPress={teste}>
          <MaterialCommunityIcons name="exit-to-app" size={40} color="#E2DA1A" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.containerDados}>
          <Text style={{fontSize:22}}>Total de Serviços</Text>
          <Text style={{fontSize: 36, fontWeight: 'bold'}}>{indicadorServicos}</Text>
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
        <TouchableOpacity style={styles.containerActions} onPress={() => navigation.navigate('Relatorios')}>
          <MaterialIcons name="analytics" size={55} color={corAmarela} />
          <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerActions}>
          <FontAwesome5 name="cart-plus" size={44} color={corAmarela} />
          <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Novo Orçamento</Text>
        </TouchableOpacity>
      </View>
    </View>
    </NavigationContainer>
  );
};

function ScreenView() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false}}/>
        <Stack.Screen name="Relatorios" component={RelatoriosScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="RelatoriosDetails" component={RelatoriosDetailsScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
    backgroundColor: corAmarela,
    width: '94%',
    height: '25%',
    borderRadius: 10,
    padding: 30,
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

});

export default ScreenView;
