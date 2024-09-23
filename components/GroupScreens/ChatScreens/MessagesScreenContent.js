import React, {useEffect,useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { corAmarela, corCinzaPrincipal, IpAtual } from '../../../src/Constants/Constantes';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BoxMensagem from './BoxMensage';

const MessagesScreenContent = ({navigation}) => {
  const [mensagens,setMensagens] = useState([]);
  const [filtroMsg,setFiltroMsg] = useState('T');
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const filtrarMensagem = (estado) =>{
    setFiltroMsg(estado)
  }

  async function buscaConversas() {
    // let idFirebase = '63f7u1oXTHcI62Tin3UXnLqnRGH3';
    let idFirebase = window.idFirebaseGlobal.toString();
    let tipoUsuario;
    if(window.tipoUsuario == 1){
      tipoUsuario = 'p'
    }else{
      tipoUsuario = 'c'
    }
    console.log(idFirebase)
    try {
        const response = await fetch(`http://${IpAtual}:3003/buscaConversas?idFirebase=${idFirebase}&tipoUsuario=${tipoUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Resultado da consulta:', data);
        setMensagens(data);
    } catch (error) {
        console.error('Consulta erro busca avaliacoes:', error);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    setReload(prevReload => !prevReload); // Alterna o estado de 'reload' para forçar a recarga
  };

  useEffect(() => {
    buscaConversas().then(() => setRefreshing(false));
  }, [reload]);

  return (
    <View style={{flex:1,backgroundColor:'black'}}>
        <View style={{width:'100%',backgroundColor:corCinzaPrincipal, height:110,flexDirection:'row',alignItems:'center',borderBottomWidth:2,borderBottomColor:corAmarela}}>
            <MaterialIcons name="chat" size={40} color={corAmarela} style={{marginLeft:30,marginTop:20}}/>
            <Text style={{marginTop:20,marginLeft: 15, color:corAmarela, fontSize:26,fontWeight:800}}>Conversas</Text>
        </View>
        <View style={{width:'100%',height:50,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>{filtrarMensagem('T')}} style={filtroMsg == 'T' ? styles.filtroMsg : styles.filtroMsgDesativado}>
                <Text style={filtroMsg == 'T' ? styles.textAtivo : styles.textDesativado}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{filtrarMensagem('N')}} style={filtroMsg == 'N' ? styles.filtroMsg : styles.filtroMsgDesativado}>
                <Text style={filtroMsg == 'N' ? styles.textAtivo : styles.textDesativado}>Não Lidas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{filtrarMensagem('L')}} style={filtroMsg == 'L' ? styles.filtroMsg : styles.filtroMsgDesativado}>
                <Text style={filtroMsg == 'L' ? styles.textAtivo : styles.textDesativado}>Lidas</Text>
            </TouchableOpacity>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={corAmarela} />} style={{width: '100%', marginTop: 10}} contentContainerStyle={{alignItems: 'center'}}>
            {mensagens.map((mensagem,index)=>(
                <BoxMensagem 
                    navigation={navigation}
                    nomeCompleto={window.tipoUsuario == 1 ? `${mensagem[2]} ${mensagem[3]}` : `${mensagem[5]} ${mensagem[6]}`}
                    idChat={mensagem[0]}
                    idDestino={window.tipoUsuario == 1 ? mensagem[1] : mensagem[4]}
                    reload={reload}
                />
            ))}
        </ScrollView>
    </View>
  );
};

export default MessagesScreenContent;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  padding:{
    marginTop: 30
  },
  filtroMsg:{
    width: 120,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: corCinzaPrincipal,
    marginTop:10,
    borderRadius: 10
  },
  filtroMsgDesativado:{
    width: 120,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: corAmarela,
    marginTop:10,
    borderRadius: 10
  },
  textAtivo:{
    color: corAmarela,
    fontWeight: 'bold',
    fontSize: 15
  },
  textDesativado:{
    color: corCinzaPrincipal,
    fontWeight: 'bold',
    fontSize: 15
  }
});