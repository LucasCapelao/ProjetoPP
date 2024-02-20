import React, { useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const HomeScreen = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('CadastroScreen'); // Substitua 'NextScreen' pelo nome da sua próxima tela
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={goToNextScreen}>
        <View>
          <Text>Ir para a Próxima Tela</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;