import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corCinzaPrincipal } from '../src/Constants/Constantes';
import NumberInCategoryIcon from '../src/functions/NumberInCategoryIcon';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Ionicons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';


export const CardPrestante = ({ navigation, fotoPerfil, nome, especialidade }) => {
    return (
        <View style={{ backgroundColor: 'white', alignItems:'center' }}>
            <NumberInCategoryIcon pCategoria={1} />
        </View>
    );
};

const styles = StyleSheet.create({

});

