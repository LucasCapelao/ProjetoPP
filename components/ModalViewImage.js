import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { corCinzaPrincipal } from '../src/Constants/Constantes';

export const ModalViewImage = ({ pVisible, pFecharModal, pImage }) => {
    return (
        <Modal style={{ flex: 1, alignItems:'center', justifyContent:'center' }} transparent={true} visible={pVisible} animationType='slide'>
            <TouchableOpacity onPress={()=>pFecharModal()} style={{width:'100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', alignItems:'center', justifyContent:'center'}}>
                <View style={{width:'70%', height:'40%', backgroundColor:corCinzaPrincipal, alignItems:'center', justifyContent:'center'}}>
                    <Image source={{ uri: pImage }} style={{width:'90%', height: '80%'}} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};