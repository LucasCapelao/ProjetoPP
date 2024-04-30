import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';


const SolicitacoesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerScreen}>
        <Text style={styles.textHeaderScreen}>Solicitações</Text>
      </View>

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
})