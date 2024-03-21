import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const corAmarela = '#E2DA1A';
const corCinzaPrincipal = '#20201C'; 

const TipoUsuarioScreen = ({ navigation }) => {
    const goToLogin = () =>{
        navigation.navigate('LoginScreen')
    }
    const goToPrestante = () =>{
        navigation.navigate('CadastroScreen',{'tipo':'prestante'})
    }
    const goToContratante = () =>{
        navigation.navigate('CadastroScreen',{'tipo': 'contratante'})
    }
    return (
        <View style={styles.body}>
            <Text style={{color:'white',fontSize: 24, fontWeight: 'bold'}}>Escolha seu tipo de <Text style={{color:corAmarela}}>Usuário</Text></Text>
            <TouchableOpacity onPress={goToPrestante} style={{backgroundColor: corAmarela, width: '90%', height: 152, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{position: 'relative', marginTop:-48, fontSize: 22, fontWeight: 'bold', color: corCinzaPrincipal}}>Quero ser um prestante</Text>
                <View style={{width: '100%', height: 48, backgroundColor:corCinzaPrincipal, alignItems: 'flex-end', justifyContent: 'center', position: 'absolute', bottom: 0}}>
                    <Text style={{color:corAmarela, position: 'absolute', left: 35, width: '65%', textAlign: 'center', fontWeight: 'bold'}}>Cadastre-se como prestante para vender seus serviços</Text>
                    <MaterialIcons style={{marginRight: 10}} name="double-arrow" size={40} color={corAmarela} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToContratante} style={{backgroundColor: corAmarela, width: '90%', height: 152, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{position: 'relative', marginTop:-48, fontSize: 22, fontWeight: 'bold', color: corCinzaPrincipal}}>Quero ser um contratante</Text>
                <View style={{width: '100%', height: 48, backgroundColor:corCinzaPrincipal, alignItems: 'flex-end', justifyContent: 'center', position: 'absolute', bottom: 0}}>
                <Text style={{color:corAmarela, position: 'absolute', left: 35, width: '65%', textAlign: 'center', fontWeight: 'bold'}}>Cadastre-se como contratante para contratar serviços</Text>
                    <MaterialIcons style={{marginRight: 10}} name="double-arrow" size={40} color={corAmarela} />
                </View>
            </TouchableOpacity>
            <TouchableHighlight onPress={goToLogin} style={{backgroundColor: corCinzaPrincipal, width: '90%', height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                <Text style={{color: corAmarela,fontSize: 26,fontWeight: 'bold'}}>Já tenho uma conta</Text>
            </TouchableHighlight>
        </View>
  );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default TipoUsuarioScreen;