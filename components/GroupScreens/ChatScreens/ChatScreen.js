import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, where, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../../firebaseConnection.js';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { corAmarela, corCinzaPrincipal, corCinzaTerciaria, userIcon } from '../../../src/Constants/Constantes.js';


export default function ChatScreen({route}) {
  const { pIdChat } = route.params;
  const { nome } = route.params;
  console.log(pIdChat)

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={()=>{console.log('click')}}
          >
            <AntDesign name="logout" size={24} color="#ddd" style={{marginRight: 10}}/>
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

  useLayoutEffect(() => {

      const collectionRef = collection(database, 'chats');
      const q = query(collectionRef, orderBy('createdAt', 'desc'), where('idChat', '==', pIdChat));

      const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
        setMessages(
          querySnapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
            idChat: doc.data().idChat
          }))
        );
      });
    return unsubscribe;
  }, [pIdChat]);

    const renderSend = (props) => {
      return (
        <Send {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              style={{marginBottom: 5, marginRight: 5}}
              size={36}
              color="#E2DA1A"
            />
          </View>
        </Send>
      );
    };

    const renderBubble = (props) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#E2DA1A',
            },
            left:{
              backgroundColor: 'rgb(40,40,40)'
            }
          }}
          textStyle={{
            right: {
              color: 'black',
            },
            left:{
              color:'white',
            }
          }}
        />
      );
    };

    const customtInputToolbar = props => {
      return (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: corCinzaPrincipal,
            }}
          />
      );
    };

    const scrollToBottomComponent = () => {
      return(
        <FontAwesome name='angle-double-down' size={22} color='#333' />
      );
    }

  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      // setMessages([...messages, ...messages]);
      const { _id, createdAt, text, user } = messages[0];    
      addDoc(collection(database, 'chats'), {
        _id,
        createdAt,
        text,
        user,
        idChat: pIdChat
      });
    }, [pIdChat]);

    return (
      <>
      <View style={{width:'100%',height:'15%', backgroundColor:corCinzaPrincipal, alignItems:'center', justifyContent:'center' }}>
        <View style={{marginTop: 35, width: '100%', height:80, flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity style={{width: 40, height:80, backgroundColor:corCinzaPrincipal, alignItems:'center',justifyContent:'center'}} onPress={()=>{navigation.goBack()}}>
            <AntDesign name="left" size={32} color={corAmarela} />
          </TouchableOpacity>
          <Image style={{width:50,height:50, marginLeft:20}} source={userIcon} />
          <Text style={{color:'white', fontSize:18, paddingLeft: 15}}>{nome}</Text>
        </View>
      </View>
      <GiftedChat
        style={{width:'100%', height:'85%'}}
        messages={messages}
        placeholder='Escreva algo...'
        showAvatarForEveryMessage={false}
        showUserAvatar={true}
        onSend={messages => onSend(messages)}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        renderInputToolbar={props => customtInputToolbar(props)}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        messagesContainerStyle={{
          backgroundColor: corCinzaTerciaria,
          borderTopColor: corAmarela,
          borderTopWidth: 1,
          borderBottomColor: corAmarela,
          borderBottomWidth: 1
        }}
        textInputStyle={{
          backgroundColor: corCinzaTerciaria,
          borderRadius: 20,
          marginRight: 8,
          color: 'black',
          borderWidth: 0.5,
          fontWeight: '300',
          paddingTop: 9,
          paddingLeft: 10,
        }}
        inputContainerStyle={{backgroundColor:corCinzaTerciaria}}
        user={{
          _id: auth?.currentUser?.email,
          avatar: require('../../../assets/do-utilizador.png')
        }}
      />
      </>
    );
}

