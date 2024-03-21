import React, { useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {app ,firebaseConfig} from '../firebaseConnection.js'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';


const auth = getAuth();

const logoIntroducao = require('../assets/6.png')
const corAmarela = '#E2DA1A';
const corCinzaPrincipal = '#20201C';

const CadastroScreen = ({ navigation, route }) => {
  const [campoEmail,setCampoEmail] = useState('default');
  const [campoSenha,setCampoSenha] = useState('default');
  const [campoConfirmarSenha,setCampoConfirmarSenha] = useState('default');
  const [modalErro, setModalErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('Mensagem Erro');
  const validaCredenciais = () =>{
    function formatarErro(mensagemDeErro) {
      const regex = /Firebase: (.+?) \((auth\/.+?)\)\./;
      const correspondencias = mensagemDeErro.match(regex);
    
      if (correspondencias && correspondencias.length === 3) {
        const mensagem = correspondencias[1]; 
        const codigoErro = correspondencias[2]; 
    
        return { mensagem, codigoErro };
      } else {
        return { mensagem: mensagemDeErro, codigoErro: null };
      }
    }
    if(campoEmail!='default' && campoSenha!= 'default' && campoConfirmarSenha != 'default'){
      if(campoSenha != campoConfirmarSenha){
        setModalErro(true)
        setMensagemErro('Os campos "Senha" e "Confirmar Senha" devem ser iguais') 
      }else{
        createUserWithEmailAndPassword(auth, campoEmail, campoConfirmarSenha)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('logado')
          console.log(user)
          console.log(user.uid)
          const { tipo } = route.params;
          if(tipo == 'prestante'){
            navigation.navigate('CadastrarPrestanteScreen',{idFirebaseParametro:user.uid,emailParametro:campoEmail})
          }else{
            navigation.navigate('CadastrarContratanteScreen',{idFirebaseParametro:user.uid,emailParametro:campoEmail})
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          if(errorMessage == 'Firebase: Error (auth/invalid-email).'){
            setModalErro(true)
            setMensagemErro('E-mail inválido, verifique e tente novamente')          
          }else if(errorMessage == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            setModalErro(true)
            setMensagemErro('Sua senha deve conter pelo menos 6 caracteres')
          }else if(errorMessage == 'Firebase: Error (auth/email-already-in-use).'){
            setModalErro(true)
            setMensagemErro('O E-mail informado já está sendo utilizado')
          }else{
            setModalErro(true)
            let resultado = formatarErro(errorMessage);    
            setMensagemErro(`Erro: ${resultado.mensagem} \n\nCódigo: ${resultado.codigo}`)
          }
        });
      }
      }else{
      setModalErro(true)
      setMensagemErro('Todos os campos devem estar preenchidos')
    }
  }
  const backScreen = () =>{
    navigation.goBack();
  }

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.totalBody}>
          <View style={styles.container}>
            <TouchableHighlight style={styles.ball} onPress={backScreen}>
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableHighlight>
            <Text style={styles.title}>Defina suas credenciais</Text>
            <View style={styles.containerCredencias}>
              <View style={styles.boxInputs}>
                <TextInput style={styles.inputModel} keyboardType='email-address' placeholder='E-mail' onChangeText={(text)=>{setCampoEmail(text)}} placeholderTextColor={'#828278'}></TextInput>
                <TextInput style={styles.inputModel} secureTextEntry={true} placeholder='Senha' onChangeText={(text)=>{setCampoSenha(text)}} placeholderTextColor={'#828278'}></TextInput>
                <TextInput style={styles.inputModel} secureTextEntry={true} placeholder='Confirme a senha' onChangeText={(text)=>{setCampoConfirmarSenha(text)}} placeholderTextColor={'#828278'}></TextInput>
              </View>
              <TouchableHighlight onPress={validaCredenciais} style={styles.btnCredenciais}>
              {/* <TouchableHighlight onPress={()=>{navigation.navigate('CadastrarInfosScreen')}} style={styles.btnCredenciais}> */}
                <Text style={styles.textBtn}>Avançar</Text>
              </TouchableHighlight>
            </View>
            <Image style={styles.image} source={logoIntroducao}></Image>
          </View>
          <Modal style={styles.modal} animationType='slide' visible={modalErro} transparent={true}>
              <TouchableWithoutFeedback onPress={()=>{setModalErro(false)}}>
              <View style={styles.backgroundModal}>
                  <View style={styles.containerModal}>
                      <View style={styles.headerModal}>
                          <MaterialIcons style={{margin: 20}} name="cancel" size={40} color="red" />
                          <Text style={styles.titleModal}>Credenciais Inválidas</Text>
                      </View>
                      <View style={styles.bodyModal}>
                          <View style={styles.containerText}>
                              <Text style={styles.textModal}>{mensagemErro}</Text>
                          </View>
                      </View>
                      <TouchableHighlight onPress={()=>{setModalErro(false)}} style={styles.btnFecharModal}>
                          <Text style={{fontSize: 18,color:corCinzaPrincipal,fontWeight:'bold'}}>Fechar</Text>
                      </TouchableHighlight>
                  </View>
              </View> 
              </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
  );
};

export default CadastroScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  totalBody:{
    flex: 1,
    backgroundColor: 'black',
  },
  ball:{
    width: 50,
    height: 50,
    backgroundColor: corAmarela,
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    color: corAmarela,
    position: 'absolute',
    top: 80,
    fontSize: 26,
    fontWeight: 'bold'

  },
  containerCredencias:{
    width: 300,
    height: 330,
    backgroundColor: corCinzaPrincipal,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  image:{
    width: 210,
    height: 100,
    position: 'absolute',
    bottom: 50
  },
  boxInputs:{
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputModel:{
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: corAmarela,
    fontSize: 20,
    padding: 10,
    justifyContent: 'center',
    marginBottom: 20,
    color: 'white'
  },
  btnCredenciais:{
    width: '90%',
    backgroundColor: corAmarela,
    height: 50,
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtn:{
    color: corCinzaPrincipal,
    fontSize: 20,
    fontWeight: 'bold'
  },
  backgroundModal:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal:{
    flex: 1
  },
  containerModal:{
      width: 300,
      minHeight: 300,
      backgroundColor: corCinzaPrincipal,
      borderRadius: 10,
  },
  headerModal:{
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      height: '30%'
  },
  titleModal:{
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold'
  },
  bodyModal:{
      paddingTop: 40,
      width: 300,
      alignItems:'center'
  },
  containerText:{
      width: '80%',
      alignItems: 'center'
  },
  textModal:{
      fontSize: 20,
      textAlign: 'center',
      color: corAmarela,
      fontWeight: '700'
  },
  btnFecharModal:{
      width: 200,
      marginLeft: 50,
      height: 50,
      backgroundColor: corAmarela,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      marginTop: 100
  }
})