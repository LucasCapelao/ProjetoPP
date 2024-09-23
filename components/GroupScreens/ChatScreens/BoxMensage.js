import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { corAmarela, corCinzaPrincipal, corCinzaSecundaria, corCinzaTerciaria, userIcon } from '../../../src/Constants/Constantes';
import AntDesign from '@expo/vector-icons/AntDesign';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { database } from '../../../firebaseConnection';

export default function BoxMensagem({ navigation, nomeCompleto, foto, mensagem, idChat, idDestino, reload }){
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadMessages = () => {
        const messagesRef = collection(database, 'chats');
        const q = query(
          messagesRef,
          where('idChat', '==', idChat),
          where('recipientId', '==', idDestino),
          where('isRead', '==', false)
        );
      
        const unsubscribe = onSnapshot(q, (snapshot) => {
          console.log(`Número de mensagens não lidas: ${snapshot.size}`); // Verifique se o número correto é exibido
          setUnreadCount(snapshot.size); // Atualiza o contador de mensagens não lidas
        });
      
        return unsubscribe;
      };
      
      useEffect(() => {
        const unsubscribe = fetchUnreadMessages();
        return () => unsubscribe();
      }, [reload]);

    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('Chat',{pIdChat:`${idChat}`,nome:nomeCompleto,pIdDestino:idDestino})}} style={{ width: '100%', height: 100, backgroundColor: corCinzaPrincipal, alignItems:'center', borderRadius:10, flexDirection:'row', marginBottom: 10 }}>
            <View style={{width: '88%', height: '100%', flexDirection: 'row', alignItems:'center'}}>
                <Image style={{width:70,height:70, marginLeft:20}} source={userIcon} />
                <View>
                    <Text style={{color:'white', fontSize:18, marginLeft: 15}}>{nomeCompleto}</Text>
                    <Text style={{color: '#828278', marginLeft: 15}}>Bom dia <Text style={{color:'#DDD'}}>08:32</Text></Text>
                    <Text>{unreadCount}</Text>
                </View>
            </View>
            <View style={{width: '12%', height: '100%', backgroundColor:corCinzaTerciaria,borderTopRightRadius: 10,borderBottomRightRadius:10,alignItems:'center', justifyContent: 'center'}}>
                <AntDesign name="right" size={24} color={corAmarela} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

});
