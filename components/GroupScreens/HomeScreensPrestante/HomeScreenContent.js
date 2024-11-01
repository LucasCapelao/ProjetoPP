import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity, Image, Alert } from 'react-native';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {getAuth, signOut } from 'firebase/auth';
import { corAmarela, IpAtual, corCinzaPrincipal, corCinzaSecundaria } from '../../../src/Constants/Constantes';


const imgFirebase = require('../../../assets/4.png')

const auth = getAuth();

export default function HomeScreenContent ({ navigation, route }) {
  const idFirebase = window.idFirebaseGlobal;
   
    const logout =()=>{
      signOut(auth).then(() => {
        navigation.reset({
            index: 0,
            routes: [],
          });
      })
      .catch((error)=>{
        alert("Erro ao deslogar "+error);
      })
  
    }
    const [indicadorServicos, setIndicadorServico] = useState(0);
    const [nomeUsuario,setNomeUsuario] = useState('');

 
      async function inserirPessoas() {
        try {
          const idFirebase = "kjsdfksdjfweirj3483nvr"
          const nome = "Alfredo"
          const sobrenome = "Silva"
          const genero = 1
          const dataNascimento = "29-01-2006"
          const cpf = "78787878787"
          const graduacao = 2
          const especialidade = 8
          const fone = 92165223;
          const email = "aaa.a@aaa.com";
          const idPessoa = 20;
          const cep = 92875050
          const uf = "SP";
          const municipio = "SAO PAULO";
          const bairro = "CENTRO";
          const rua = "RUA DEZ";
          const numero = 400;
          const complemento = "";
          const response = await fetch(`http://${IpAtual}:3003/insertPessoas?possuiEndereco=S`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idFirebase, nome, sobrenome, genero, dataNascimento, cpf, graduacao, especialidade, idPessoa, cep, uf, municipio, bairro, rua, numero, complemento, fone, email })
          });
          console.log(JSON.stringify(response))
        }catch (error) {
          console.error('Erro ao cadastrar pessoas:', error);
        }
      }

    // inserirPessoas();

    return (
      <NavigationContainer independent={true}>
      <View style={{ flex: 1, backgroundColor:'black' }}>
        <View style={styles.headerScreen}>
          <Text style={styles.titleHeader}>Olá, {nomeUsuario}</Text>
          <TouchableOpacity style={styles.boxIconExit} onPress={logout}>
            <MaterialCommunityIcons name="exit-to-app" size={40} color="#E2DA1A" />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.containerDados}>
            <Text style={{fontSize:22}}>Total de Serviços</Text>
            <Text style={{fontSize: 36, fontWeight: 'bold'}}>{indicadorServicos}</Text>
          </View>
          <View style={styles.lineOptions}>
            <TouchableOpacity style={styles.boxLineOptions} onPress={()=>{navigation.navigate('AvaliacoesScreen',{telaOrigem:''})}}>
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
          <TouchableOpacity style={styles.containerActions} onPress={() => navigation.navigate('AgendaScreen')}>
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