import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Entypo, Foundation } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {Dimensions} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {app} from '../firebaseConnection.js';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import DatePicker from 'react-native-ui-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';
import {formatarCpfDB,formatarDataDB,formatarDataUsuario,formatarFone} from '../src/Converters/Converter.js'
import { storage } from '../firebaseConnection.js';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const lineDividerWidth = windowWidth - 100;
const logoIntroducao = require('../assets/6.png');
const statusBarHeight = StatusBar.currentHeight;
console.disableYellowBox = true;

const uploadImageToFirebase = async (uri) => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const reference = storage().ref(fileName);

    const task = reference.putFile(uri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    try {
      await task;
      const url = await reference.getDownloadURL();
      console.log('Image uploaded to Firebase successfully, download URL:', url);
    } catch (e) {
      console.error('Image upload failed:', e);
    }
  };

  uploadImageToFirebase(logoIntroducao)

const CadastrarInfosScreen = ({ navigation, route }) => {
    const { idFirebaseParametro } = route.params;
    console.log(idFirebaseParametro);
    const { emailParametro } = route.params;
    console.log(emailParametro);
    const { capturedImage } = route.params || {};
    const [isFocusGenero, setIsFocusGenero] = useState(false);
    const [isFocusGraduacao, setIsFocusGraduacao] = useState(false);
    const [isFocusEspecialidade, setIsFocusEspecialidade] = useState(false);
    const [modalCalendario, setModalCalendario] = useState(false);
    const [date, setDate] = useState(new Date());
    const [btnConfirmarData, setBtnConfirmarData] = useState(false);
    const [cpf,setCpf] = useState('');
    const [telefone,setTelefone] = useState('');
    const [email,setEmail] = useState(emailParametro);
    const [nome, setNome] = useState(null);
    const [sobrenome, setSobrenome] = useState(null);


    const backScreen = () =>{
        navigation.goBack()
    }    
    const goToCamera = () =>{
        navigation.navigate('CameraFront',{request:'CadastrarPrestanteScreen'})
    }

    const [generoCadastro,setGeneroCadastro] = useState([]);
    const [especialidadeCadastro,setEspecialidadeCadastro] = useState([]);
    const [graduacaoCadastro,setGraduacaoCadastro] = useState([]);
    useEffect(() => {
        async function buscaGenero() {
            try {
                const response = await fetch(`http://${IpAtual}:3003/buscaGenero`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                const generos = data.map(item => {
                    return {
                        value: item[0].toString(),
                        label: item[1]
                    };
                });
                setGeneroCadastro(generos);
                console.log('Resultado da consulta:', data);
            } catch (error) {
                console.error('Consulta erro busca genero:', error);
            }
        }

        async function buscaEspecialidades() {
            try {
                const response = await fetch(`http://${IpAtual}:3003/buscaEspecialidades`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                const especialidades = data.map(item => {
                    return {
                        value: item[0].toString(),
                        label: item[1]
                    };
                });
                setEspecialidadeCadastro(especialidades);
                console.log('Resultado da consulta:', data);
            } catch (error) {
                console.error('Consulta erro busca especialidades:', error);
            }
        }

        async function buscaGraduacao() {
            try {
                const response = await fetch(`http://${IpAtual}:3003/buscaGraduacao`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                const graduacao = data.map(item => {
                    return {
                        value: item[0].toString(),
                        label: item[1]
                    };
                });
                setGraduacaoCadastro(graduacao);
                console.log('Resultado da consulta:', data);
            } catch (error) {
                console.error('Consulta erro busca graduacao:', error);
            }
        }

        buscaGenero();
        buscaEspecialidades();
        buscaGraduacao();
    }, []);

    const [selectedValueGenero, setSelectedValueGenero] = useState('');
    const handleSelectGenero = (item, index) => {
      console.log("Valor selecionado:", item.value);
      setSelectedValueGenero(item.value);
    };

    const [selectedValueGraduacao, setSelectedValueGraduacao] = useState('');
    const handleSelectGraduacao = (item, index) => {
      console.log("Valor selecionado:", item.value);
      setSelectedValueGraduacao(item.value);
    };

    const [selectedValueEspecialidade, setSelectedValueEspecialidade] = useState('');
    const handleSelectEspecialidade = (item, index) => {
      console.log("Valor selecionado:", item.value);
      setSelectedValueEspecialidade(item.value);
    };


    const [dateAux, setDateAux] = useState(new Date());
    function confirmarData(){
        if(dateAux == date){
            setBtnConfirmarData(true);
            setModalCalendario(false);
        }else{
            setDateAux(date);
            setDate(date);
            setBtnConfirmarData(true);
            setModalCalendario(false);
        }
    }

    async function inserirCadastro() {
        if(nome != null && sobrenome != null && selectedValueGenero != '' && date != '' && cpf != '' && selectedValueEspecialidade != '' && selectedValueGraduacao != '' && telefone != '' && email != ''){
            try {
                const idFirebaseDB = idFirebaseParametro;
                const nomeDB = nome;
                const sobrenomeDB = sobrenome;
                const generoDB = selectedValueGenero;
                const dataNascimentoDB = formatarDataDB(date);
                const cpfDB = formatarCpfDB(cpf);
                const graduacaoDB = selectedValueGraduacao;
                const especialidadeDB = selectedValueEspecialidade;
                const foneDB = formatarFone(telefone);
                const emailDB = email;
                const response = await fetch(`http://${IpAtual}:3003/insertPrestante`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idFirebaseDB, nomeDB, sobrenomeDB, generoDB, dataNascimentoDB, cpfDB, graduacaoDB, especialidadeDB, foneDB, emailDB })
                });
                // console.log(response)
            }catch (error) {
                console.error('Erro ao cadastrar:', error);
            }
        }else{
            alert("Preencha todos os campos");
        }
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.headerScreen}>
                <Text style={styles.textHeaderScreen}>Novo Prestante</Text>
            </View>
            {/* <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}> */}
            <KeyboardAwareScrollView style={styles.bodyCadastro} contentContainerStyle={{ flexGrow: 1 }} extraScrollHeight={20} enableOnAndroid={true} keyboardOpeningTime={0} animateKeyboardShouldPersistTaps={false}>
            <View style={styles.containerPrincipal}>
                <View style={styles.containerTop}>
                    <View style={styles.boxCamera}>
                        {!capturedImage ?(
                            <TouchableOpacity onPress={goToCamera} style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 10}}>
                                <Entypo name="camera" size={30} color={corAmarela} />
                            </TouchableOpacity>
                        ):(
                            <View style={{width: '100%', height: '100%'}}>
                                <Image style={{width: '100%', height: '100%', borderRadius: 10, transform: [{ scaleX: -1 }]}} source={{ uri: capturedImage }}></Image>
                                <TouchableHighlight onPress={()=>{navigation.navigate('CameraFront',{request:'CadastrarPrestanteScreen'})}} style={{width: 40,height:40,backgroundColor: corAmarela, alignItems: 'center',justifyContent:'center', position: 'absolute',right: -15,bottom: -15, borderRadius: '100%'}}>
                                    <Foundation name="refresh" size={24} color="black" />
                                </TouchableHighlight>
                            </View>
                        )}
                    </View>
                    <View style={styles.boxCampos}>
                        <TextInput placeholder='Nome' placeholderTextColor={'#828278'} style={styles.modelCampoPrimario} value={nome} onChangeText={(text) => {setNome(text)}}></TextInput>
                        <TextInput placeholder='Sobrenome' placeholderTextColor={'#828278'} style={styles.modelCampoPrimario} value={sobrenome} onChangeText={(text) => {setSobrenome(text)}}></TextInput>
                        <Dropdown
                            style={[styles.dropdown, isFocusGenero && { borderColor: corAmarela }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={generoCadastro}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusGenero ? 'Gênero' : '...'}
                            value={selectedValueGenero}
                            onSelect={handleSelectGenero}
                            selectedValue={selectedValueGenero}
                            onChange={(selectedItem, index) => {handleSelectGenero(selectedItem, index); 
                                setIsFocusGenero(false); }}
                            onFocus={() => setIsFocusGenero(true)}
                            onBlur={() => setIsFocusGenero(false)}
                            />
                    </View>
                </View>
                <View style={styles.dividerBox}>
                    <Text style={styles.textDivider}>Complemento</Text>
                    <View style={styles.lineDivider}></View>
                </View>

        {/* 

            INICIO DOS CAMPOS DE COMPLEMENTO

        */}

                <View style={styles.boxComplemento}>
                    <View style={styles.rowComplementoCampos}>
                        <View style={styles.boxNascimentoComplemento}>
                            <Text style={styles.textTituloCampos}>Data Nascimento</Text>
                            <TouchableOpacity style={styles.campoDataComplemento} onPress={()=>{setModalCalendario(true)}}>
                                {btnConfirmarData?(
                                    <Text style={{color: 'white'}}>{formatarDataUsuario(date)}</Text>
                                ):(
                                    <Text style={{color: '#828278'}}>dd/mm/aaaa</Text>
                                )}
                                <MaterialIcons name="date-range" size={24} color={corAmarela} />
                            </TouchableOpacity>
                        </View>
                        <Modal style={styles.modal} animationType='slide' visible={modalCalendario} transparent={true}>
                            <TouchableWithoutFeedback style={{width: '100%', height: '100%'}} onPress={()=>{setModalCalendario(false)}}>
                                <View style={styles.backgroundModal}>
                                    <View style={styles.viewCalendario}>
                                        <View style={styles.boxCalendario}>
                                            <DatePicker
                                                value={date}
                                                date={date}
                                                mode='date'
                                                display='calendar'
                                                onValueChange={(date) => setDate(date)}
                                                headerButtonColor={corAmarela}
                                                selectedItemColor={corAmarela}
                                                calendarTextStyle={{color: 'white'}}
                                                selectedTextStyle={{color: 'black'}}
                                                headerTextStyle={{color: corAmarela}}
                                                monthContainerStyle={{backgroundColor:corCinzaSecundaria,borderColor:'transparent'}}
                                                yearContainerStyle={{backgroundColor:corCinzaSecundaria,borderColor:'transparent'}}
                                                weekDaysTextStyle={{color:corCinzaSecundaria}}
                                            />
                                        </View>
                                        <View style={styles.boxBtnCalendario}>
                                            <TouchableOpacity style={styles.btnCancelarData} onPress={()=>{setModalCalendario(false)}}>
                                                <Text style={{color: 'red'}}>Cancelar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btnConfirmarData} onPress={()=>{confirmarData()}}>
                                                <Text style={{fontWeight: 'bold'}}>Confirmar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <View style={styles.boxCpfComplemento}>
                            <Text style={styles.textTituloCampos}>CPF</Text>
                            <TextInputMask
                                style={styles.modelCampoInfos}
                                type={'cpf'}
                                value={cpf}
                                onChangeText={(text) => {setCpf(text)}}
                                placeholder='000.000.000-00'
                                placeholderTextColor={corCinzaSecundaria}
                            />                    
                        </View>
                    </View>
                    <View style={styles.rowComplementoCampos}>
                        <View style={styles.boxCampoGraduacao}>
                            <Text style={styles.textTituloCampos}>Graduação</Text>
                            <Dropdown
                                style={[styles.dropGraduacao, isFocusGraduacao && { borderColor: corAmarela }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={graduacaoCadastro}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusGraduacao ? 'Graduação' : '...'}
                                value={selectedValueGraduacao}
                                onSelect={handleSelectGraduacao}
                                selectedValue={selectedValueGraduacao}
                                onChange={(selectedItem, index) => {handleSelectGraduacao(selectedItem, index); 
                                    setIsFocusGraduacao(false); }}
                                onFocus={() => setIsFocusGraduacao(true)}
                                onBlur={() => setIsFocusGraduacao(false)}
                                />
                        </View>
                        <View style={styles.boxCampoEspecialidade}>
                            <Text style={styles.textTituloCampos}>Especialidade</Text>
                            <Dropdown
                                style={[styles.dropGraduacao, isFocusEspecialidade && { borderColor: corAmarela }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={especialidadeCadastro}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusEspecialidade ? 'Especialidade' : '...'}
                                value={selectedValueEspecialidade}
                                onSelect={handleSelectEspecialidade}
                                selectedValue={selectedValueEspecialidade}
                                onChange={(selectedItem, index) => {handleSelectEspecialidade(selectedItem, index); 
                                    setIsFocusEspecialidade(false); }}
                                onFocus={() => setIsFocusEspecialidade(true)}
                                onBlur={() => setIsFocusEspecialidade(false)}
                                />
                        </View>
                    </View>
                </View>

        {/* 

            FIM DOS CAMPOS DE COMPLEMENTO

        */}

                <View style={styles.dividerBox}>
                    <Text style={styles.textDivider}>Contato</Text>
                    <View style={styles.lineDivider}></View>
                </View>
                <View style={styles.boxContato}>
                    <View style={styles.boxTelefoneContato}>
                        <Text style={styles.textTituloCampos}>Telefone</Text>
                        <TextInputMask
                                style={styles.modelCampoInfos}
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                value={telefone}
                                onChangeText={(text) => {setTelefone(text)}}
                                placeholder='(00) 00000-0000' 
                                placeholderTextColor={corCinzaSecundaria}
                        />           
                    </View>
                    <View style={styles.boxEmailContato}>
                        <Text style={styles.textTituloCampos}>E-mail</Text>
                        <TextInput keyboardType="email-address" style={styles.modelCampoInfos} value={email} onChangeText={(text) => {setEmail(text)}} placeholder='E-mail' placeholderTextColor={corCinzaSecundaria}/>           
                    </View>
                </View>
                </View>
            </KeyboardAwareScrollView>
                {/* </KeyboardAvoidingView> */}
            <View style={styles.containerBtn}>
                <TouchableHighlight style={styles.ball} onPress={backScreen}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableHighlight>
                <TouchableOpacity style={styles.btnAvancar} onPress={inserirCadastro}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>Finalizar</Text>
                    <AntDesign style={{position: 'relative', left: 40}} name="arrowright" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CadastrarInfosScreen

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
    bodyCadastro:{
        width:'90%',
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: corCinzaPrincipal,
        borderRadius: 10,
        padding: 20
    },    
    containerBtn:{
        height: '9%',
        width: '90%',
        // backgroundColor: 'red'
    },
    ball:{
        width: 50,
        height: 50,
        backgroundColor: corAmarela,
        position: 'absolute',
        bottom: 10,
        left: 0,
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAvancar:{
        position: 'absolute',
        backgroundColor: corAmarela,
        width: 270,
        height: 50,
        borderRadius: '100%',
        bottom: 10,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    containerPrincipal:{
        width: '100%',
        flexDirection: 'column'
    },
    containerTop:{
        display: 'flex',
        flexDirection: 'row',
    },
    boxCamera:{
        width: '32%',
        height: 135,
        backgroundColor: '#828278',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxCampos:{
        width: '68%',
        height: 170,
        // backgroundColor: 'red',
        alignItems: 'center'
    },
    modelCampoPrimario:{
        width: '85%',
        marginBottom: 5,
        height: 35, 
        borderBottomColor: corAmarela,
        borderBottomWidth: 1,
        color: 'white',
        fontSize: 18,
    },
    dropdown:{
        height: 40,
        marginTop: 5,
        width: '85%',
        borderColor: corAmarela,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle:{
        fontSize: 16,
        color: '#828278'
    },
    selectedTextStyle:{
        fontSize: 16,
        color: 'white'
    },
    dividerBox:{
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'column',
    },
    textDivider:{
        color: corAmarela,
        fontWeight: 'bold',
        fontSize: 24
    },
    lineDivider:{
        width: '100%',
        height: 1,
        backgroundColor: corAmarela,
        marginTop: 10
    },
    modal:{
        flex: 1,
        backgroundColor: 'black'
    },
    backgroundModal:{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxCalendario:{
        width:300,
        height: 350,
        backgroundColor: '#000000',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1

    },
    viewCalendario:{
        width: 300,
        height: 400,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    btnConfirmarData:{
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: corAmarela,
        borderRadius: 10,
        marginTop: 10
    },
    btnCancelarData:{
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'red',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 15,
        marginTop: 10
    },
    boxBtnCalendario:{
        flexDirection: 'row'
    },
    boxNascimentoComplemento:{
        marginTop: 10,
        width: '45%',
    },
    textTituloCampos:{
        fontSize: 16,
        color: 'white'
    },
    campoDataComplemento:{
        width: '100%',
        height: 40,
        marginTop: 5,
        borderWidth: 1,
        borderColor: corAmarela,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    boxComplemento:{
        flexDirection: 'column',
        width: '100%',
    },
    boxCpfComplemento:{
        width: '45%',
        marginLeft: '10%',
        marginTop: 10,
        height: 40
    },
    modelCampoInfos:{
        width: '100%',
        height: 40,
        marginTop: 5,
        borderWidth: 1,
        borderColor: corAmarela,
        borderRadius: 10,
        color: 'white',
        paddingLeft: 10 
    },
    rowComplementoCampos:{
        flexDirection:'row',
        width: '100%',
        paddingBottom: 15
    },
    boxCampoGraduacao:{
        width: '45%'
    },
    dropGraduacao:{
        height: 40,
        marginTop: 5,
        width: '100%',
        borderColor: corAmarela,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    boxCampoEspecialidade:{
        width: '45%',
        marginLeft: '10%'
    },
    boxContato:{
        width: '100%',
        flexDirection: 'row'
    },
    boxTelefoneContato:{
        width: '45%',
        marginTop: 10
    },
    boxEmailContato:{
        width: '45%',
        marginTop: 10,
        marginLeft: '10%'
    }
})