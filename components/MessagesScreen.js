import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../src/styles/MessagesStyles';

const Messages = [
  {
    id: '1',
    userName: 'João Silva',
    userImg: require('../assets/do-utilizador.png'),
    messageTime: '4 mins ago',
    messageText:
      'Bom Dia',
  },
  
];

const MessagesScreen = ({navigation}) => {
    return (
      <Container style={styles.padding}>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};


export default MessagesScreen;

// export default function MessagesScreenView() {
//     return (
//         <Stack.Navigator options={{ headerShown: false}}>
//           <Stack.Screen name="Home" component={HomeScreenContent} options={{ headerShown: false}}/>
//           <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false}}/>
//           <Stack.Screen name="Relatorios" component={RelatoriosScreen} options={{headerShown: false }}/>
//           <Stack.Screen name="RelatoriosDetails" component={RelatoriosDetailsScreen} options={{ headerShown: false}}/>
//         </Stack.Navigator>
//     )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  padding:{
    marginTop: 30
  }
});