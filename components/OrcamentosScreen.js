import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { corAmarela } from '../src/Constants/Constantes';

const OrcamentosScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems:'center' }}>
            <View style={styles.headerScreen}>
              <Text style={styles.textHeaderScreen}>Orçamentos</Text>
            </View>
        </View>
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
});

export default OrcamentosScreen;