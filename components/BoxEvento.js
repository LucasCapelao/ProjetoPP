import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria } from '../src/Constants/Constantes';

const BoxEvento = ({ navigation }) => {
    return (
        <View style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}}>
            <View style={{ width: '90%', height: 100, backgroundColor: corCinzaPrincipal,flexDirection:'column'}}>
                <View style={{width:'35%',height:'100%'}}>
                    <Text></Text>
                </View>
            </View>
            <View style={{width:'90%',height:50,backgroundColor:corCinzaTerciaria}}></View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default BoxEvento;