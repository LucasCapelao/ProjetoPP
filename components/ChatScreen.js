import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebaseConnection.js';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';


export default function Chat() {

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <AntDesign name="logout" size={24} color="#ddd" style={{marginRight: 10}}/>
          </TouchableOpacity>
        )
      });
    }, [navigation]);

  useLayoutEffect(() => {

      const collectionRef = collection(database, 'chats');
      const q = query(collectionRef, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
        setMessages(
          querySnapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user
          }))
        );
      });
  return unsubscribe;
    }, []);

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
        user
      });
    }, []);

    return (
      <GiftedChat
        messages={messages}
        placeholder='Escreva algo...'
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        messagesContainerStyle={{
          backgroundColor: 'rgb(255,255,255)',
        }}
        textInputStyle={{
          backgroundColor: 'rgb(255,255,255)',
          borderRadius: 20,
          marginRight: 8,
          color: 'black',
          borderWidth: 0.5,
          fontWeight: '300',
          paddingTop: 9,
          paddingLeft: 10
        }}
        inputContainerStyle={{backgroundColor:'#ddd'}}
        user={{
          _id: auth?.currentUser?.email,
          avatar: require('../assets/do-utilizador.png')
        }}
      />
    );
}

