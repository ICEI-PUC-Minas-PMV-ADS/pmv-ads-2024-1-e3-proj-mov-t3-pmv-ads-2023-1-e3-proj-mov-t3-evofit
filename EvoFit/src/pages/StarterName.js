import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

const StarterName = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const handleNextAction = () => {
    if (!name) {
      alert("Você precisa informar seu nome!");
      return;
    }
    navigation.navigate('StarterDiasTreino');
  };

  return (
    <Container style={styles.containerIntro}>
      <Header title={'Bem vindo(a) ao EvoFit'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="chevron-right" onPress={handleNextAction} />
      </Header>
      <Body>
        <Text style={styles.headerText}> Qual é o seu nome? </Text>
        <Input
          label="Digite seu nome"
          activeUnderlineColor='#780202'
          autoFocus={true}
          autoCapitalize='words'
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleNextAction}
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
