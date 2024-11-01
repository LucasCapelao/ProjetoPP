import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Modal, Image, Pressable } from 'react-native';
import { IpAtual, corAmarela, corCinzaPrincipal, corCinzaTerciaria, corCinzaSecundaria } from '../src/Constants/Constantes';
import { Dropdown } from 'react-native-element-dropdown';
import { ModalViewImage } from './ModalViewImage';
import { dataAtual } from '../src/Constants/Constantes';

export const ModalDetailsSolicitacao = ({ navigation, pVisible, pFecharModal, fotoPerfil, nome, descricao, data, hora, idSolicitacao }) => {
    const [modalImagem,setModalImagem] = useState(false)
    const [isFocusMes, setIsFocusMes] = useState(false);
    const [selectedValueMes, setSelectedValueMes] = useState('');
    const [isFocusDia, setIsFocusDia] = useState(false);
    const [selectedValueDia, setSelectedValueDia] = useState('');
    const [isFocusHoraSolicitacao, setIsFocusHoraSolicitacao] = useState(false);
    const [selectedValueHoraSolicitacao, setSelectedValueHoraSolicitacao] = useState('');
    const [dias,setDias] = useState([]);
    const [horas,setHoras] = useState([]);

    const meses = [
        { label: 'Janeiro', value: '01' },
        { label: 'Fevereiro', value: '02' },
        { label: 'Março', value: '03' },
        { label: 'Abril', value: '04' },
        { label: 'Maio', value: '05' },
        { label: 'Junho', value: '06' },
        { label: 'Julho', value: '07' },
        { label: 'Agosto', value: '08' },
        { label: 'Setembro', value: '09' },
        { label: 'Outubro', value: '10' },
        { label: 'Novembro', value: '11' },
        { label: 'Dezembro', value: '12' },
    ];


    const salvarSolicitacao = () =>{
        pFecharModal()
    }

    const fecharModal = () =>{
        setModalImagem(false)
    }

    const handleSelectHoraSolicitacao = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueHoraSolicitacao(item.value);
    };

    const handleSelectMes = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueMes(item.value);
    };

    const handleSelectDia = (item, index) => {
        console.log("Valor selecionado:", item.value);
        setSelectedValueDia(item.value);
    };

    useEffect(() => {
        const diasArray = [];
        for(let i = 1;i<=31;i++){
            diasArray.push({ label: `${i}`, value: i });
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

    const enviarSolicitacao = () =>{
        atualizaSolicitacao(`${selectedValueDia}-${selectedValueMes}-2024`,selectedValueHoraSolicitacao.replace(':',''),dataAtual(),idSolicitacao)

    }

    async function atualizaSolicitacao(pDataServico,pHoraServico,pDataEnviado,pId){
        const dataServico = pDataServico
        const horaServico = pHoraServico
        const dataEnviado = pDataEnviado
        const id = pId
        try {
            const response = await fetch(`http://${IpAtual}:3003/atualizaSolicitacao?dataServico=${dataServico}&horaServico=${horaServico}&dataEnviado=${dataEnviado}&id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Resultado da consulta:', data);
        } catch (error) {
            console.error('Erro ao update solicitações:', error);
        } finally {
            pFecharModal()
        }
    }
    
    return (
        <Modal style={{ flex: 1, alignItems:'center', justifyContent:'center' }} transparent={true} visible={pVisible} animationType='slide'>
            <View style={{width: '100%', height: '100%', backgroundColor:'rgba(0,0,0,0.6)', justifyContent:'flex-end'}}>
                <View style={{backgroundColor:corCinzaPrincipal,width:'100%', height:'80%', borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
                    <View style={{width:'100%', height: 120, margin: 20, flexDirection: 'row'}}>
                        <Pressable onPress={()=>setModalImagem(true)}>
                            <Image source={{ uri:fotoPerfil }} style={{width: 120, height: 120, borderRadius: 10}}/>
                        </Pressable>
                        <ModalViewImage 
                            pVisible={modalImagem}
                            pFecharModal={fecharModal}
                            pImage={fotoPerfil}
                        />
                        <View>
                            <Text style={{color:corAmarela, fontSize:20, fontWeight:'bold', marginLeft: 10}} >{nome}</Text>
                            <Text style={{color:corCinzaSecundaria, fontSize:16, fontWeight:'bold', marginLeft: 10}} >4,8 | 138 Avaliacoes</Text>
                            <Text style={{marginLeft: 10, color:'white', fontSize: 18, marginTop: 5, width: 230, height:'50%'}}>Descricao teste solicitacao </Text>
                        </View>
                    </View>
                    <Text style={{margin: 10, color:'white', fontSize: 20, fontWeight:'bold'}}>Detalhes</Text>
                    <View style={{width: '100%', height: 1, backgroundColor:'white'}}></View>
                    <View style={{width:'100%', height:80, marginTop:20}}>
                        <Text style={{color:corAmarela, fontSize: 16, fontWeight:'bold', marginLeft:20}} >Horário de Início</Text>
                        <Dropdown
                                style={[styles.dropdown, isFocusHoraSolicitacao && { borderColor: corAmarela }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={horas}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusHoraSolicitacao ? 'Horário de Inicio' : '...'}
                                value={selectedValueHoraSolicitacao}
                                selectedValue={selectedValueHoraSolicitacao}
                                onChange={(selectedItem, index) => {handleSelectHoraSolicitacao(selectedItem, index); 
                                setIsFocusHoraSolicitacao(false); }}
                                onFocus={() => setIsFocusHoraSolicitacao(true)}
                                onBlur={() => setIsFocusHoraSolicitacao(false)}
                            />
                    </View>
                    <View style={styles.containerData}>
                        <Text style={{color:corAmarela, fontSize: 16, fontWeight:'bold', marginLeft:20, marginTop: 16}} >Mês</Text>
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
                        <Text style={{color:corAmarela, fontSize: 16, fontWeight:'bold', marginLeft:20, marginTop: 20}} >Dia</Text>
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
                    <TouchableHighlight style={styles.btnLoginAmarelo} onPress={enviarSolicitacao}>
                        <Text style={styles.textBtnAmarelo}>Enviar Solicitação</Text>
                    </TouchableHighlight>   
                </View>
            </View>
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
    btnLoginAmarelo:{
        width: '90%',
        height: 60,
        backgroundColor: corAmarela,
        marginTop: 10, 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        position:'absolute',
        bottom: 40
    },
    textBtnAmarelo:{
        color: corCinzaPrincipal,
        fontSize: 26,
        fontWeight: 'bold'
    },
});