import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity, Image, Alert } from 'react-native';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {getAuth, signOut } from 'firebase/auth';
import { corAmarela, IpAtual, corCinzaPrincipal, corCinzaSecundaria } from '../../../src/Constants/Constantes';
import { uploadImageAsync, salvarImagem, uploadImageToStorage } from '../../../firebaseConnection';
import * as ImagePicker from 'expo-image-picker';


const imgFirebase = require('../../../assets/4.png')

const auth = getAuth();

export default function HomeScreenContent ({ navigation, route }) {
  const idFirebase = window.idFirebaseGlobal;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow selection of all media types (images, videos)
      allowsEditing: true, // Allow the user to edit the selected image
      aspect: [4, 3], // Set the aspect ratio for editing (optional)
      quality: 1, // Set the image quality (1 is the highest)
    });
  
    if (!result.canceled && result.assets[0].uri) {
      // Check if the user didn't cancel the selection and an image URI is available
      console.log('Selected image URI:', result.assets[0].uri);
  
      try {
        const downloadURL = await uploadImageToStorage(result.assets[0].uri, idFirebase);
        console.log('Image uploaded successfully. Download URL:', downloadURL);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
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
                <AntDesign name="right" size={32} color='black' />
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:corCinzaPrincipal}}>
              <Text style={{fontSize:22}}>Total de Serviços</Text>
              <Text style={{fontSize: 36, fontWeight: 'bold'}}>0</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.containerActions} onPress={() => navigation.navigate('AgendaScreen')}>
            <MaterialIcons name="all-inbox" size={50} color={corAmarela} />
            <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Solicitações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerActions} onPress={() => navigation.navigate('Relatorios')}>
            <FontAwesome name="search" size={48} color={corAmarela} />
            <Text style={{fontSize: 25, color: corAmarela, marginLeft: 20, fontWeight: 'bold'}}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerActions}>
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