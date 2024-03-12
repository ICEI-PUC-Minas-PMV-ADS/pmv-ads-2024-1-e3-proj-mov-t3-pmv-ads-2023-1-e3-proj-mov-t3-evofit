import React from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import Input from '../components/Input';

import { useNavigation } from '@react-navigation/native'

const StarterName = () => {

const navigation = useNavigation();

  return (
   <Container style={styles.containerIntro}>
      <Header title={'Bem vindo(a) ao EvoFit'} goBack={() => navigation.goBack()}>
  
      </Header>

      <Body>
       <Text style={styles.headerText}> Qual é o seu nome? </Text>
        <Input
          label="Digite seu nome"
          activeUnderlineColor='#780202'
          
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerIntro: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  
  },
 headerText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    textAlign: 'center',
    
  },
 
 
});

export default StarterName;