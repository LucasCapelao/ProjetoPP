import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Modal} from 'react-native';
import {} from '../firebaseConnection.js'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as LocalAuthentication from 'expo-local-authentication';
import {TESTE_IP} from '@env';

const statusBarHeight = StatusBar.currentHeight;
const iconLogin = require('../assets/4.png');
const corAmarela = '#E2DA1A';
const corCinzaPrincipal = '#20201C';
  
export default function LoginScreen({navigation,route}) {  
    const [campoEmail, setCampoEmail] = useState('default');
    const [campoSenha, setCampoSenha] = useState('default');
    const [modalErro, setModalErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('Mensagem Erro');
    var auxMsgError = ''
    const loginTeste = () =>{
        navigation.navigate('HomeScreen');
    }
    const [tipoUsuario, setTipoUsuario] = useState('');
    const functionLogin = () =>{
        if(campoEmail != 'default' && campoSenha != 'default'){
            const auth = getAuth();
            signInWithEmailAndPassword(auth,campoEmail,campoSenha)
            .then((userCredential) => {
                console.log('logado com sucesso')
                const user = userCredential.user;
                console.log(user.uid)
                let auxIdFirebase = user.uid;
                function aguardarLoginCompleto(){
                    return new Promise((resolve,reject)=>{
                        if(auxIdFirebase){
                            window.idFirebaseGlobal = auxIdFirebase;
                            resolve(window.idFirebaseGlobal);
                            console.log(`id da promise ${window.idFirebaseGlobal}`)
                        }
                    });
                }
                aguardarLoginCompleto();
                async function verificaTipoUsuario() {
                    try {
                        const idFirebaseXTipoUsuario = auxIdFirebase;
                        const response = await fetch(`http://${TESTE_IP}:3000/verificaTipoUsuario?idFirebase=${idFirebaseXTipoUsuario}`, {
                            method: 'GET',
                            headers: {
                            'Content-Type': 'application/json'
                            }
                        });
                        const data = await response.json();
                        console.log('Resultado da consulta ifxtu:', data[0][2]);
                        setTipoUsuario(data[0][2]);
                    } catch (error) {
                        console.error('Consulta erro ifxtu:', error);
                    }
                }
                verificaTipoUsuario();
                if(tipoUsuario == "PRESTANTE"){
                    navigation.navigate('HomeScreen',{idFirebaseParametro:auxIdFirebase});
                }else{
                    navigation.navigate('HomeScreen',{idFirebaseParametro:auxIdFirebase});                    
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                auxMsgError = errorCode;
                console.log('não entrou')
                if(auxMsgError == 'auth/invalid-login-credentials'){
                    setMensagemErro('E-mail e/ou senha incorretos')
                    setModalErro(true)
                }else if(auxMsgError == 'auth/too-many-requests'){
                    setMensagemErro('Credenciais inválidas, aguarde alguns instantes e tente novamente')
                    setModalErro(true)
                }else{
                    setMensagemErro('Algo deu errado, tente novamente')
                    console.log(errorMessage)
                    setModalErro(true)
                }
            });
        }else{
            setMensagemErro('Informe o E-mail e senha para fazer Login')
            setModalErro(true)
        }
    }
    const functionCadastro = () =>{
        navigation.replace('TipoUsuarioScreen');
        // navigation.navigate('CadastrarInfosScreen');
    }
    return (
        <NavigationContainer independent={true}>{
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <StatusBar style="auto" />
            <Image style={styles.iconLogin} source={iconLogin}></Image>
            <View style={styles.containerLogin}>
                <Text style={styles.titleLogin}>Login</Text>
                <View style={styles.containerInput}>
                <View style={styles.coverInput}>
                    <TextInput placeholder='E-mail' placeholderTextColor='#828278' onChangeText={(text) => setCampoEmail(text)} style={styles.inputModel}></TextInput>
                </View>
                <View style={styles.coverInput}>
                    <TextInput placeholder='Senha' secureTextEntry={true} placeholderTextColor='#828278' onChangeText={(text) => setCampoSenha(text)} style={styles.inputModel}></TextInput>
                </View>
                <Text style={styles.textRedefinir}>Esqueci minha senha</Text>
                </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
        <View style={styles.containerBtn}>
            <TouchableHighlight style={styles.btnLoginCinza} onPress={functionLogin}>
            <Text style={styles.textBtnCinza}>Entrar</Text>
            </TouchableHighlight> 
            <TouchableHighlight style={styles.btnLoginAmarelo} onPress={functionCadastro}>
            <Text style={styles.textBtnAmarelo}>Cadastre-se</Text>
            </TouchableHighlight>      
        </View>
        <Modal style={styles.modal} animationType='slide' visible={modalErro} transparent={true}>
            <TouchableWithoutFeedback onPress={()=>{setModalErro(false)}}>
            <View style={styles.backgroundModal}>
                <View style={styles.containerModal}>
                    <View style={styles.headerModal}>
                        <MaterialIcons style={{margin: 20}} name="cancel" size={50} color="red" />
                        <Text style={styles.titleModal}>Login Inválido</Text>
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
        </KeyboardAvoidingView>
        }</NavigationContainer>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: corAmarela,
    alignItems: 'center'
},
iconLogin:{
    width: '60%',
    height: '30%',
    marginTop: statusBarHeight
},
containerLogin:{
    width: '100%',
    height: '70%',
    backgroundColor: '#000',
    borderTopLeftRadius: '25',
    borderTopRightRadius: '25',
},
titleLogin:{
    color: corAmarela,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20
},
containerInput:{
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
},
backgroundInput:{
    width: '100%',
    height: 50,
    backgroundColor: corCinzaPrincipal,
},
coverInput:{
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: corCinzaPrincipal,
    borderRadius: 10,
    marginBottom: 15,
},
inputModel:{
    width: '85%',
    height: 30,
    backgroundColor: corCinzaPrincipal,
    borderBottomColor: corAmarela,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: 'white'
},
textRedefinir:{
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: -10
},
containerBtn:{
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10
},
btnLoginCinza:{
    width: '90%',
    height: 60,
    backgroundColor: corCinzaPrincipal,
    marginTop: 10, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
},
btnLoginAmarelo:{
    width: '90%',
    height: 60,
    backgroundColor: corAmarela,
    marginTop: 10, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
},
textBtnCinza:{
    color: corAmarela,
    fontSize: 26,
    fontWeight: 'bold'
},
textBtnAmarelo:{
    color: corCinzaPrincipal,
    fontSize: 26,
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
    flex: 1,
},
containerModal:{
    Width: 300,
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
    fontSize: 24,
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
});
