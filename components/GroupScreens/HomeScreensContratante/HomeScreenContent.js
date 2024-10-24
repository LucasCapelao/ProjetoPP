import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity, Image, Alert } from 'react-native';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {getAuth, signOut } from 'firebase/auth';
import { corAmarela, IpAtual, corCinzaPrincipal, corCinzaSecundaria, corVerdeIcon, userIcon } from '../../../src/Constants/Constantes';
import { uploadImageAsync, salvarImagem, uploadImageToStorage } from '../../../firebaseConnection';
import * as ImagePicker from 'expo-image-picker';
import ultimaFuncao from '../../../firebaseConnection';
import * as ImageManipulator from 'expo-image-manipulator';


const imgFirebase = require('../../../assets/4.png')

const auth = getAuth();

export default function HomeScreenContent ({ navigation, route }) {
  const idFirebase = 'asdasjdasdiasjda';
  const [image, setImage] = useState(null);

const pickImage = async () => {
  console.log('Inicio do pickImage');
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  
  console.log('Resultado do ImagePicker:', result);

  if (!result.canceled && result.assets[0].uri) {
    console.log('Selected image URI:', result.assets[0].uri);
    
    try {
      // Resize the image before uploading
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      console.log('Resized image URI:', manipResult.uri);
      
      console.log('Inicio do upload');
      const downloadURL = await ultimaFuncao(manipResult.uri, 'testearquivo');
      console.log('Image uploaded successfully. Download URL:', downloadURL);
      console.log('Fim do upload');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  } else {
    console.log('User canceled image picking or no URI found');
  }
  console.log('Fim do pickImage');
};

  
   
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

    return (
      <NavigationContainer independent={true}>
      <View style={{ flex: 1, backgroundColor:'black' }}>
        <View style={styles.headerScreen}>
          <Text style={styles.titleHeader}>Olá,</Text>
          <TouchableOpacity style={styles.boxIconExit} onPress={logout}>
            <MaterialCommunityIcons name="exit-to-app" size={40} color="#E2DA1A" />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.containerDados}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', height: 40, justifyContent:'space-between'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', paddingLeft: 20}}>Próximos Eventos</Text>
              <TouchableOpacity style={{ width: 50, borderLeftColor: 'black', borderLeftWidth: 1, height: '100%', alignItems:'center', justifyContent:'center'}}>
                <AntDesign name="right" size={26} color='black' />
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:corCinzaPrincipal, width: '100%', height:129, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent:'center'}}>
              <View style={{width:'88%', height: 45, flexDirection: 'row', alignItems:'center'}}>
                <Text style={{color:corAmarela, fontSize: 18, fontWeight:'bold'}}>09 de Novembro</Text>
                <View style={{width: 70, marginLeft:10, borderLeftWidth: 1, borderLeftColor: 'white', borderRightColor: 'white', borderRightWidth: 1, alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>10:00</Text>
                  <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>12:30</Text>
                </View>
                <Text style={{color:corVerdeIcon, fontSize: 14, fontWeight:'bold', marginLeft: 10}}>R$ 200,00</Text>
              </View>
              <View style={{width: '88%', height: 1, backgroundColor: 'white'}}></View>
              <View style={{width:'88%', height: 70, flexDirection: 'row', alignItems:'center'}}>
                <Image source={userIcon} style={{width:40, height: 40}} />
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 18, color:'white'}}>Pedro Costa da Silva</Text>
                  <Text style={{fontSize: 18, color:corCinzaSecundaria}}>4,8 | 118 Avaliações</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.containerActions} onPress={() => navigation.navigate('SolicitacoesContratanteScreen')}>
            <MaterialIcons name="all-inbox" size={50} color={corAmarela} />
            <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Solicitações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerActions} onPress={() => navigation.navigate('Buscar')}>
            <FontAwesome name="search" size={48} color={corAmarela} />
            <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerActions} onPress={pickImage}>
            <Ionicons name="settings-sharp" size={50} color={corAmarela} />
            <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Configurações</Text>
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
      fontSize: 22,
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
      marginBottom: 40
    },
    boxLineOptions:{
      width: '23%',
      height:80,
      backgroundColor: '#20201C',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'space-evenly',
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