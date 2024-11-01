import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import {IpAtual, corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria, userIcon, corVerdeIcon, corVermelhaIcon} from '../src/Constants/Constantes.js';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { ModalViewImage } from './ModalViewImage';
import { ModalDetailsSolicitacao } from './ModalDetailsSolicitacao.js';

export default function ItemSolicitacaoContratante(props){
    const [modalImagem,setModalImagem] = useState(false)
    const [modalSolicitacao,setModalSolicitacao] = useState(false)

    const fecharModalImagem = () =>{
        setModalImagem(false)
    }

    const fecharModalSolicitacao = () =>{
        setModalSolicitacao(false)
        props.setSituacao('E')
        props.setSituacao('P')
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxCabecalho}>
                <Pressable onPress={()=>setModalImagem(true)}>
                    <Image style={styles.userIcon} source={{ uri: props.fotoPerfil }} />
                </Pressable>
                <ModalViewImage 
                    pVisible={modalImagem}
                    pFecharModal={fecharModalImagem}
                    pImage={props.fotoPerfil}
                />
                <Text style={{color: 'white', fontSize: 18}}>{props.nome}</Text>
            </View>
            <View style={styles.boxInfos}>
                <View style={styles.boxLeft}>
                    <Text style={{color:corAmarela, fontSize:40, fontWeight:800}}>{props.dia}</Text>
                    <Text style={{color:corAmarela, fontSize:35, fontWeight:300, marginTop:-15}}>{props.mes}</Text>
                </View>
                <View style={styles.boxCenter}>
                    <View style={styles.boxEndereco}>
                        <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{props.endereco}</Text>
                    </View>
                    <View style={styles.boxActions}>
                        <View style={{backgroundColor: corCinzaTerciaria, width: 70, height: 40, borderRadius: 4, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 300}}>{props.horario}</Text>
                        </View>
                        {props.situacao !== 'A' && props.situacao !== 'E' ? (
                            <>
                                <TouchableOpacity style={styles.coverActions} onPress={()=>setModalSolicitacao(true)}>
                                    <MaterialCommunityIcons name="calendar-clock" size={28} color={corAmarela} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <></>
                        )}
                        <ModalDetailsSolicitacao
                            pVisible={modalSolicitacao}
                            pFecharModal={fecharModalSolicitacao}
                            fotoPerfil={props.fotoPerfil}
                            nome={props.nome}
                            idSolicitacao={props.idSolicitacao}
                        />
                        {props.situacao !== 'A' ? (
                            <>
                                <TouchableOpacity style={styles.coverActions}>
                                    <MaterialCommunityIcons name="information" size={28} color={corAmarela} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <></>
                        )}
                    </View>
                </View>
                <View style={styles.boxRight}>
                {props.situacao !== 'E' && props.situacao !== 'A' ? (
                    <>
                        <TouchableOpacity style={styles.coverActions} onPress={() => props.onUpdateAceitar(props.idSolicitacao)}> 
                            <FontAwesome name="check-circle" size={28} color={corVerdeIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.coverActions} onPress={() => props.onUpdateRecusar(props.idSolicitacao)}>
                            <MaterialIcons name="cancel" size={28} color={corVermelhaIcon} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <></>
                )}
                {props.situacao !== 'E' && props.situacao !== 'P' ? (
                    <>
                        <TouchableOpacity style={styles.coverActions} onPress={() => props.onUpdateAceitar(props.idSolicitacao)}> 
                        <MaterialCommunityIcons name="information" size={28} color={corAmarela} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <></>
                )}

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '90%',
        height: 180,
        backgroundColor: corCinzaPrincipal,
        borderRadius: 10,
        marginBottom: 30
    },
    boxCabecalho:{
        width: '100%',
        height: '30%',
        backgroundColor: corCinzaTerciaria,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    boxInfos:{
        width: '100%',
        height: '70%',
        display: 'flex',
        flexDirection: 'row'
    },
    userIcon:{
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 4
    },
    boxLeft:{
        width: '26%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: corCinzaTerciaria,
        borderRightWidth: 1
    },
    boxCenter:{
        width: '54%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxRight:{
        width: '20%', 
        // backgroundColor: 'pink', 
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderLeftColor: corCinzaTerciaria,
        borderLeftWidth: 1
    },
    boxEndereco:{
        width: '90%',
        height: 60,
        // backgroundColor: 'green',
        marginBottom: 5
    },
    boxActions:{
        width: '90%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    coverActions:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: corCinzaTerciaria,
        borderRadius: 4
    }
})
