import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';
import { Octicons } from '@expo/vector-icons';
import ItemSolicitacao from './ItemSolicitacao.js';


const SolicitacoesScreen = ({ navigation }) => {
  const [endereco,setEndereco] = useState('Av. Unisinos, 950 - Cristo Rei, São Leopoldo - RS, 93022-750');

  return (
    <View style={styles.container}>
      <View style={styles.headerScreen}>
        <Text style={styles.textHeaderScreen}>Solicitações</Text>
      </View>
      <View style={styles.containerFilter}>
        <Octicons name="arrow-switch" size={36} color={corAmarela} style={{ transform: [{ rotate: '90deg' }] }} />
        <Text style={{color: 'white', fontSize: 22, fontWeight:'bold', paddingLeft: 15}}>Últimas Solicitações</Text>
      </View>
      <ScrollView style={styles.containerSolicitacoes} contentContainerStyle={styles.contentContainerSolicitacoes}>
        <ItemSolicitacao nome="João da Silva" dia="09" mes="nov" endereco={endereco} horario="10:30"/>
      </ScrollView>
    </View>


  );
};

export default SolicitacoesScreen;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center'
  },
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
      fontWeight: 'bold'
  },
  containerFilter:{
    width: '90%',
    height: 40,
    marginTop: 30,
    marginLeft: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center'
    // backgroundColor: 'green'
  },
  containerSolicitacoes:{
    width: '100%',
    // height: '40%',
    marginTop: 30,
    // backgroundColor: 'green',
  },
  contentContainerSolicitacoes:{
    alignItems: 'center',
  }
})