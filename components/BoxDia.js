import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corCinzaPrincipal } from '../src/Constants/Constantes';

export default function BoxDia({navigation,dia,diaSemana,mes}){
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('DetailsDiaScreen',{mes:mes,dia:dia})}} style={{ width: 65, height: 70, backgroundColor: corCinzaPrincipal, borderRadius: 10, alignItems: 'center',justifyContent:'center', marginTop: 10}}>
            <Text style={{color: 'white',fontWeight:300, fontSize: 22}}>{dia}</Text>
            <Text style={{color: 'white',fontWeight:300, fontSize: 14}}>{diaSemana}</Text>
        </TouchableOpacity>
    );
};

