import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { AntDesign, MaterialIcons, Entypo, Foundation } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import {app} from '../firebaseConnection.js';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import DatePicker from 'react-native-ui-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria} from '../src/Constants/Constantes.js';
import {formatarCpfDB,formatarDataDB,formatarDataUsuario,formatarFone,formatarCep,windowWidth} from '../src/Converters/Converter.js'
import buscaCep from '../src/APIs/BuscaCep.js';


const db = getFirestore(app);
console.disableYellowBox = true;

const CadastrarInfosScreen = ({ navigation, route }) => {
    const backScreen = () =>{
        navigation.goBack()
    }    
    const goToCamera = () =>{
        navigation.navigate('CameraFront',{request:'CadastrarContratanteScreen'})
    }

    const [generoCadastro,setGeneroCadastro] = useState([]);

    console.log(IpAtual);
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
        buscaGenero();
    }, []);

    const { idFirebaseParametro } = route.params;
    console.log(idFirebaseParametro);
    const { emailParametro } = route.params;
    console.log(emailParametro);
    const { capturedImage } = route.params || {};
    const [isFocusGenero, setIsFocusGenero] = useState(false);
    const [modalCalendario, setModalCalendario] = useState(false);
    const [date, setDate] = useState(new Date());
    const [btnConfirmarData, setBtnConfirmarData] = useState(false);
    const [cpf,setCpf] = useState('');
    const [telefone,setTelefone] = useState('');
    const [email,setEmail] = useState(emailParametro);
    const [nome, setNome] = useState(null);
    const [sobrenome, setSobrenome] = useState(null);
    const [cep, setCep] = useState(null);
    const [uf, setUf] = useState(null);
    const [municipio, setMunicipio] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [logradouro, setLogradouro] = useState(null);
    const [numero, setNumero] = useState(null);
    const [complemento, setComplemento] = useState(null);

    async function apiBuscaCep(){
        try{
            const response = await buscaCep.get(`/${cep}/json/`);
            console.log(response.data);
            setUf(response.data.uf);
            setMunicipio(response.data.localidade);
            setBairro(response.data.bairro);
            setLogradouro(response.data.logradouro);
        }catch(ex){
            console.log(`erro na chamada da api ${ex}`)
        }
    }

    const [selectedValueGenero, setSelectedValueGenero] = useState('');
    const handleSelectGenero = (item, index) => {
      console.log("Valor selecionado:", item.value);
      setSelectedValueGenero(item.value);
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

    // const adicionarUsuario = async () => {
    //     try {
    //       const usersCollection = collection(db, 'users');
    //       const usuarioRef = await addDoc(usersCollection, {
    //         first: 'Ada',
    //         last: 'Lovelace',
    //         born: 1815,
    //       });
    //       console.log('Usuário adicionado com ID:', usuarioRef.id);
    //     } catch (error) {
    //       console.error('Erro ao adicionar usuário:', error.message);
    //     }
    //   };

    async function inserirCadastro() {
        try {
          const idFirebaseDB = idFirebaseParametro
          const nomeDB = nome
          const sobrenomeDB = sobrenome
          const generoDB = selectedValueGenero
          const dataNascimentoDB = formatarDataDB(date)
          const cpfDB = formatarCpfDB(cpf)
          const graduacaoDB = 0
          const especialidadeDB = 0
          const foneDB = formatarFone(telefone);
          const emailDB = email;
          const tipoUsuarioDB = 2
          const fotoPerfilDB = 'test este tets e'
          const cepDB = formatarCep(cep)
          const ufDB = uf
          const municipioDB = municipio
          const bairroDB = bairro
          const ruaDB = logradouro
          const numeroDB = numero
          const complementoDB = complemento
          const response = await fetch(`http://${IpAtual}:3003/insertPessoas?possuiEndereco=S`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idFirebaseDB, nomeDB, sobrenomeDB, generoDB, dataNascimentoDB, cpfDB, graduacaoDB, especialidadeDB, foneDB, emailDB, tipoUsuarioDB, fotoPerfilDB, cepDB, ufDB, municipioDB, bairroDB, ruaDB, numeroDB, complementoDB })
          });
          console.log(JSON.stringify(response))
          navigation.replace('TabBarContratanteView')
        }catch (error) {
          console.error('Erro ao cadastrar pessoas:', error);
        }
      }

        async function inserirCadastro2() {
            if(nome != null && sobrenome != null && selectedValueGenero != '' && date != '' && cpf != '' && cep != '' && uf != '' && municipio != '' && bairro != '' && logradouro != '' && numero != '' && telefone != '' && email != ''){
                try {
                    const idFirebaseDB = idFirebaseParametro;
                    const nomeDB = nome;
                    const sobrenomeDB = sobrenome;
                    const generoDB = selectedValueGenero;
                    const dataNascimentoDB = formatarDataDB(date);
                    const cpfDB = formatarCpfDB(cpf);
                    const cepDB = formatarCep(cep);
                    const ufDB = uf;
                    const municipioDB = municipio;
                    const bairroDB = bairro;
                    const ruaDB = logradouro;
                    const numeroDB = numero;
                    const complementoDB = complemento;
                    const foneDB = formatarFone(telefone);
                    const emailDB = email;
                    const response = await fetch(`http://${IpAtual}:3003/insertContratante`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idFirebaseDB, nomeDB, sobrenomeDB, generoDB, dataNascimentoDB, cpfDB, cepDB, ufDB, municipioDB, bairroDB, ruaDB, numeroDB, complementoDB, foneDB, emailDB })
                    });
                    console.log(JSON.stringify(response))
                }catch (error) {
                    console.error('Erro ao cadastrar contratante:', error);
                }
            }else{
                alert("Preencha todos os campos");
            }
        }

        async function query() {
            try {
                const nome = 'Lucas'
                const response = await fetch(`http://${IpAtual}:3003/query?nome=${nome}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log('Resultado da consulta:', data);
            } catch (error) {
                console.error('Consulta erro query:', error);
            }
        }

    return(
        <View style={styles.container}>
            <View style={styles.headerScreen}>
                <Text style={styles.textHeaderScreen}>Novo Contratante</Text>
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
                                <TouchableHighlight onPress={()=>{navigation.navigate('CameraFront',{request:'CadastrarContratanteScreen'})}} style={{width: 40,height:40,backgroundColor: corAmarela, alignItems: 'center',justifyContent:'center', position: 'absolute',right: -15,bottom: -15, borderRadius: '100%'}}>
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
                    <View style={styles.rowCampos}>
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
                </View>

        {/* 

            FIM DOS CAMPOS DE COMPLEMENTO

        */}

                {/* CAMPOS DE ENDEREÇO */}

                <View style={styles.dividerBox}>
                   <Text style={styles.textDivider}>Endereço</Text>
                    <View style={styles.lineDivider}></View>
                </View>
                <View style={styles.boxEndereco}>
                    <View style={styles.rowCampos}>
                        <View style={styles.boxCepEndereco}>
                            <Text style={styles.textTituloCampos}>CEP</Text>
                            <TextInputMask
                                    style={styles.modelCampoInfos}
                                    type={'zip-code'}
                                    value={cep}
                                    onChangeText={(text) => {setCep(text)}}
                                    placeholder='00000-000' 
                                    placeholderTextColor={corCinzaSecundaria}
                                    onEndEditing={apiBuscaCep}
                            />           
                        </View>
                        <View style={styles.boxUfEndereco}>
                            <Text style={styles.textTituloCampos}>UF</Text>
                            <TextInput style={styles.modelCampoInfos} value={uf} onChangeText={(text) => {setUf(text)}} placeholder='UF' placeholderTextColor={corCinzaSecundaria}/>           
                        </View>
                    </View>
                    <View style={styles.rowCampos}>
                        <View style={styles.boxMunicipioEndereco}>
                            <Text style={styles.textTituloCampos}>Municipio</Text>
                            <TextInput style={styles.modelCampoInfos} value={municipio} onChangeText={(text) => {setMunicipio(text)}} placeholder='Município' placeholderTextColor={corCinzaSecundaria}/>           
                        </View>
                        <View style={styles.boxBairroEndereco}>
                            <Text style={styles.textTituloCampos}>Bairro</Text>
                            <TextInput style={styles.modelCampoInfos} value={bairro} onChangeText={(text) => {setBairro(text)}} placeholder='Bairro' placeholderTextColor={corCinzaSecundaria}/>           
                        </View>
                    </View>
                    <View style={styles.rowCampos}>
                        <View style={styles.boxLogradouroEndereco}>
                            <Text style={styles.textTituloCampos}>Logradouro</Text>
                            <TextInput style={styles.modelCampoInfos} value={logradouro} onChangeText={(text) => {setLogradouro(text)}} placeholder='Logradouro' placeholderTextColor={corCinzaSecundaria}/>           
                        </View>
                        <View style={styles.boxNumeroEndereco}>
                            <Text style={styles.textTituloCampos}>Número</Text>
                            <TextInput style={styles.modelCampoInfos} value={numero} onChangeText={(text) => {setNumero(text)}} placeholder='Número' placeholderTextColor={corCinzaSecundaria}/>           
                        </View>
                    </View>
                    <View style={styles.rowCampos}>
                        <View style={styles.boxComplementoEndereco}>
                            <Text style={styles.textTituloCampos}>Complemento</Text>
                            <TextInput style={styles.modelCampoInfos} value={complemento} onChangeText={(text) => {setComplemento(text)}} placeholder='Complemento' placeholderTextColor={corCinzaSecundaria}/>           
                        </View>
                    </View>
                </View>

                {/* CAMPOS DE CONTATO */}

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
    rowCampos:{
        flexDirection:'row',
        width: '100%',
        paddingBottom: 15
    },
    boxContato:{
        width: '100%',
        flexDirection: 'row',
        marginBottom: 40
    },
    boxTelefoneContato:{
        width: '45%',
        marginTop: 10
    },
    boxEmailContato:{
        width: '45%',
        marginTop: 10,
        marginLeft: '10%'
    },
    boxEndereco:{
        marginTop: 10,
        width: '100%',
        flexDirection: 'column',
    },
    boxCepEndereco:{
        width: '45%'
    },
    boxUfEndereco:{
        marginLeft: '10%',
        width: '45%'
    },
    boxMunicipioEndereco:{
        width: '45%'
    },
    boxBairroEndereco:{
        width: '45%',
        marginLeft: '10%'
    },
    boxLogradouroEndereco:{
        width: '45%'
    },
    boxNumeroEndereco:{
        width: '45%',
        marginLeft: '10%'
    },
    boxComplementoEndereco:{
        width: '100%'
    }
})