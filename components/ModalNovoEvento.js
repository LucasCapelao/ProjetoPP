import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Modal, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { corCinzaSecundaria, corCinzaPrincipal, corAmarela, corVerdeIcon, userIcon, IpAtual } from '../src/Constants/Constantes';
import { Dropdown } from 'react-native-element-dropdown';
import { toCapitalize } from '../src/Converters/Converter';

const ModalNovoEvento = ({pVisible, pFecharModal, fotoUsuario, pNome, pEndereco, pDia, pMes, pHoraInicio, pIdContratante, pIdEndereco }) => {
    const [horas,setHoras] = useState([]);
    const [isFocusHoraFinal, setIsFocusHoraFinal] = useState(false);
    const [selectedValueHoraFinal, setSelectedValueHoraFinal] = useState('');
    const [descricaoEvento,setDescricaoEvento] = useState('');
    const [mesReduzido,setMesReduzido] = useState(pMes!=null?pMes.substring(0,3):'')

    console.log(pIdEndereco)
    const handleSelectHoraFinal = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueHoraFinal(item.value);
    };

    useEffect(() => {
        const horarios = [];
        const formatarHorario = (hora, minuto) => {
            const hh = String(hora).padStart(2, '0');
            const mm = String(minuto).padStart(2, '0');
            return `${hh}:${mm}`;
        };
        let ordenacao = 0;
        for (let hora = 0; hora < 24; hora++) {   
            for (let minuto = 0; minuto < 60; minuto += 15) {
                ordenacao++
                horarios.push({ label: `${formatarHorario(hora, minuto)}`, value:`${formatarHorario(hora, minuto)}`, ordem: ordenacao});
            }
        }
        setHoras(horarios);
        setMesReduzido(pMes!=null?pMes.substring(0,3):'')
        console.log('mes param',pMes)
        console.log('mes red',mesReduzido)
      },[])

    async function adicionarEvento() {
        try {
            let idFirebase = window.idFirebaseGlobal
            // let idFirebase = '63f7u1oXTHcI62Tin3UXnLqnRGH3'
            let mes = toCapitalize(pMes)
            let dia = pDia
            let horaInicio = pHoraInicio.replace(':','')
            let horaFinal = selectedValueHoraFinal.replace(':','')
            let descricao = descricaoEvento
            let situacao = 'P'
            let classeEvento = 3
            let idContratante = pIdContratante
            let idEndereco = pIdEndereco
            const response = await fetch(`http://${IpAtual}:3003/insertEventos`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idFirebase,mes,dia,horaInicio,horaFinal,descricao,situacao,classeEvento,idContratante,idEndereco })
            });
            console.log(JSON.stringify(response))
            alert('Evento Adicionado','Evento adicionado com sucesso')
        }catch (error) {
            console.error('Erro ao cadastrar eventos:', error);
            alert('Erro','Não foi possível adicionar novo evento')
        }
    } 

    const salvar = () =>{
        if(selectedValueHoraFinal != '' && descricaoEvento != ''){
            adicionarEvento()
            setSelectedValueHoraFinal('')
            setDescricaoEvento('')
            pFecharModal()
        }else{
            alert('Todos os campos devem ser preenchidos')
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={pVisible}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1, backgroundColor:'rgba(0,0,0,0.6)'}}>
                <View style={{width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.6)'}}>
                    <View style={{width:'100%', height:'80%', backgroundColor: corCinzaPrincipal, position:'absolute', bottom:0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={{fontSize:26, color:'white', padding: 20}}>Defina alguns detalhes</Text>
                        <View style={{width: '100%', height: '20%', alignItems:'center', flexDirection:'row', borderTopWidth:0.5, borderTopColor:'white', borderBottomWidth:0.5, borderBottomColor:'white'}}>
                            <Image source={userIcon} style={{width:80, height: 80, marginLeft: 15}} />
                            <View style={{height: 80, width: '56%'}}>
                                <Text style={{fontSize:20, color:'white', marginLeft: 10}}>{pNome}</Text>
                                <Text style={{fontSize: 14, color: corCinzaSecundaria, width: '100%', marginLeft: 10, paddingRight:10}}>{pEndereco}</Text>
                            </View>
                            <View style={{borderLeftColor:'white', borderLeftWidth: 1, height:60, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{marginLeft:17, color:corAmarela, fontSize:20, fontWeight:'bold'}}>{pDia}</Text>
                                <Text style={{marginLeft:17, color:corAmarela, fontSize:20, fontWeight:'bold'}}>{mesReduzido}.</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', height: '40%', marginTop: 50}}>
                            <Text style={{color:corCinzaSecundaria, fontSize: 13, marginLeft: 20}}>Defina uma hora final</Text>
                            <Dropdown
                                style={[styles.dropdown, isFocusHoraFinal && { borderColor: corAmarela }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={horas}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusHoraFinal ? 'Hora Final' : '...'}
                                value={selectedValueHoraFinal}
                                selectedValue={selectedValueHoraFinal}
                                onChange={(selectedItem, index) => {handleSelectHoraFinal(selectedItem, index); 
                                setIsFocusHoraFinal(false); }}
                                onFocus={() => setIsFocusHoraFinal(true)}
                                onBlur={() => setIsFocusHoraFinal(false)}
                            />
                            <Text style={{color:corCinzaSecundaria, fontSize: 13, marginLeft: 20, marginTop: 20}}>Defina uma descrição</Text>
                            <TextInput style={styles.modelCampoInfos} multiline value={descricaoEvento} onChangeText={(text) => {setDescricaoEvento(text)}} placeholder='Descrição Evento' placeholderTextColor={corCinzaSecundaria}/>
                        </View>
                        <TouchableOpacity onPress={salvar} style={{width:160, height:40, alignItems:'center', justifyContent:'center', borderColor: corVerdeIcon, borderWidth: 1, position:'absolute', bottom: '7%', right: '7%', borderRadius: 10}}>
                            <Text style={{color:corVerdeIcon, fontSize:18, fontWeight:'bold'}}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    dropdown:{
        height: 50,
        marginTop: 5,
        width: '89%',
        borderColor: '#E2DA1A',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginLeft: 20
    },
    placeholderStyle:{
        fontSize: 16,
        color: '#828278'
    },
    selectedTextStyle:{
        fontSize: 16,
        color: 'white'
    },
    modelCampoInfos:{
        width: '89%',
        height: 100,
        marginTop: 5,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: corAmarela,
        borderRadius: 10,
        color: 'white',
        padding: 10 
    },
});

export default ModalNovoEvento;