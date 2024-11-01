import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Modal, Image, Pressable } from 'react-native';
import { IpAtual, corAmarela, corCinzaPrincipal, corCinzaTerciaria, corCinzaSecundaria } from '../src/Constants/Constantes';
import { Dropdown } from 'react-native-element-dropdown';
import { ModalViewImage } from './ModalViewImage';
import { dataAtual } from '../src/Constants/Constantes';

export const ModalInfosSolicitacao = ({ navigation, pVisible, pFecharModal, fotoPerfil, nome, descricao, data, hora, idSolicitacao }) => {
    const [modalImagem,setModalImagem] = useState(false)

    const salvarSolicitacao = () =>{
        pFecharModal()
    }

    const fecharModal = () =>{
        setModalImagem(false)
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