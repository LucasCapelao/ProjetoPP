import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TouchableHighlight, Alert } from 'react-native';
import { corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria } from '../src/Constants/Constantes';
import Entypo from '@expo/vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import { IpAtual } from '../src/Constants/Constantes';
import { NumberInMonth } from '../src/functions/NumberInMonth';


const AdicionarEventoScreen = ({ navigation }) => {
    const [isFocusMes, setIsFocusMes] = useState(false);
    const [selectedValueMes, setSelectedValueMes] = useState('');
    const [isFocusDia, setIsFocusDia] = useState(false);
    const [selectedValueDia, setSelectedValueDia] = useState('');
    const [isFocusHoraInicio, setIsFocusHoraInicio] = useState(false);
    const [selectedValueHoraInicio, setSelectedValueHoraInicio] = useState('');
    const [horaInicioDB, setHoraInicioDB] = useState()
    const [isFocusHoraFinal, setIsFocusHoraFinal] = useState(false);
    const [selectedValueHoraFinal, setSelectedValueHoraFinal] = useState('');
    const [dias,setDias] = useState([]);
    const [horas,setHoras] = useState([]);
    const [descricaoEvento,setDescricaoEvento] = useState('');

    const meses = [
        { label: 'Janeiro', value: '1' },
        { label: 'Fevereiro', value: '2' },
        { label: 'Março', value: '3' },
        { label: 'Abril', value: '4' },
        { label: 'Maio', value: '5' },
        { label: 'Junho', value: '6' },
        { label: 'Julho', value: '7' },
        { label: 'Agosto', value: '8' },
        { label: 'Setembro', value: '9' },
        { label: 'Outubro', value: '10' },
        { label: 'Novembro', value: '11' },
        { label: 'Dezembro', value: '12' },
      ];

      useEffect(() => {
        const diasArray = [];
        for(let i = 1;i<=31;i++){
            diasArray.push({ label: `${i}`, value: i });
            // console.log(i);
            setDias(diasArray);
        }
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
      },[])

    const handleSelectMes = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueMes(item.value);
    };

    const handleSelectDia = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueDia(item.value);
    };

    const handleSelectHoraInicio = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueHoraInicio(item.label);
    };

    function formatarHora(){
        console.log(selectedValueHoraInicio)
        setHoraInicioDB(selectedValueHoraInicio.replace(':',''))
        console.log(horaInicioDB)
        return horaInicioDB
    }

    const handleSelectHoraFinal = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueHoraFinal(item.value);
    };

    async function adicionarEvento() {
        try {
            let idFirebase = 'aklsdqhduwnsvosidcce'
            let mes = NumberInMonth(parseInt(selectedValueMes),'S')
            let dia = selectedValueDia
            let horaInicio = selectedValueHoraInicio.replace(':','')
            let horaFinal = selectedValueHoraFinal.replace(':','')
            let descricao = descricaoEvento
            let situacao = 'P'
            const response = await fetch(`http://${IpAtual}:3003/insertEventos`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ idFirebase,mes,dia,horaInicio,horaFinal,descricao,situacao })
            });
            console.log(JSON.stringify(response))
            Alert.alert('Evento Adicionado','Evento adicionado com sucesso')
            navigation.goBack();
          }catch (error) {
            console.error('Erro ao cadastrar eventos:', error);
            Alert.alert('Erro','Não foi possível adicionar novo evento')
          }
    } 

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.headerScreen}>
                <Text style={styles.textHeaderScreen}>Novo Evento</Text>
                </View>
                <View style={{width:'90%', marginTop: 40}}>
                    <Text style={{color:'white',marginLeft: 3,fontSize:18}}>Data do Evento <Text style={{color:'#b0b0b0',fontSize: 14}}>(mês e dia)</Text></Text>
                </View>
                <View style={styles.containerData}>
                    <Dropdown
                        style={[styles.dropdown, isFocusMes && { borderColor: corAmarela }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={meses}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusMes ? 'Mês' : '...'}
                        value={selectedValueMes}
                        selectedValue={selectedValueMes}
                        onChange={(selectedItem, index) => {handleSelectMes(selectedItem, index); 
                        setIsFocusMes(false); }}
                        onFocus={() => setIsFocusMes(true)}
                        onBlur={() => setIsFocusMes(false)}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocusDia && { borderColor: corAmarela }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={dias}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusDia ? 'Dia' : '...'}
                        value={selectedValueDia}
                        selectedValue={selectedValueDia}
                        onChange={(selectedItem, index) => {handleSelectDia(selectedItem, index); 
                        setIsFocusDia(false); }}
                        onFocus={() => setIsFocusDia(true)}
                        onBlur={() => setIsFocusDia(false)}
                    />
                </View>
                <View style={{width:'90%', marginTop: 40}}>
                    <Text style={{color:'white',marginLeft: 3,fontSize:18}}>Hora do Evento <Text style={{color:'#b0b0b0',fontSize: 14}}>(início e fim)</Text></Text>
                </View>
                <View style={styles.containerData}>
                    <Dropdown
                        style={[styles.dropdown, isFocusHoraInicio && { borderColor: corAmarela }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={horas}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusHoraInicio ? 'Hora Início' : '...'}
                        value={selectedValueHoraInicio}
                        selectedValue={selectedValueHoraInicio}
                        onChange={(selectedItem, index) => {handleSelectHoraInicio(selectedItem, index); 
                        setIsFocusHoraInicio(false); }}
                        onFocus={() => setIsFocusHoraInicio(true)}
                        onBlur={() => setIsFocusHoraInicio(false)}
                    />
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
                </View>
                <View style={{width:'90%', marginTop: 40}}>
                    <Text style={{color:'white',marginLeft: 3,fontSize:18}}>Descrição do Evento</Text>
                </View>
                <View style={styles.containerDescricao}>
                    <TextInput style={styles.modelCampoInfos} multiline value={descricaoEvento} onChangeText={(text) => {setDescricaoEvento(text)}} placeholder='Descrição Evento' placeholderTextColor={corCinzaSecundaria}/>
                </View>
                <TouchableOpacity style={styles.btnAmarelo} onPress={adicionarEvento}>
                    <Text style={styles.textBtnAmarelo}>Adicionar Evento</Text>
                </TouchableOpacity>
            </View>         
        </TouchableWithoutFeedback>
      );
};

const styles = StyleSheet.create({
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
      fontWeight: 'bold',
    },
    containerData:{
        width: '90%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerDescricao:{
        width: '90%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    dropdown:{
        height: 40,
        marginTop: 5,
        width: '47%',
        borderColor: '#E2DA1A',
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
    modelCampoInfos:{
        width: '100%',
        height: 100,
        marginTop: 5,
        borderWidth: 1,
        borderColor: corAmarela,
        borderRadius: 10,
        color: 'white',
        paddingLeft: 10 
    },
    btnAmarelo:{
        width: '90%',
        height: 60,
        backgroundColor: corAmarela,
        marginTop: 10, 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
    textBtnAmarelo:{
        color: corCinzaPrincipal,
        fontSize: 26,
        fontWeight: 'bold'
    },
});

export default AdicionarEventoScreen;