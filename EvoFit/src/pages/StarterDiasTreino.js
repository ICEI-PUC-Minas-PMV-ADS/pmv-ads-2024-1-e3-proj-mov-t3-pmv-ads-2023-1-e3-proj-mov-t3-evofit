import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import { Button } from 'react-native-paper'; // Importe o botão, se necessário
import { useNavigation } from '@react-navigation/native';

const StarterDiasTreino = () => {
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack(); // Navega de volta para a página anterior (StarterName)
  };

  return (
    <Container style={styles.container}>
      <Header title={'Seleção de Dias de Treino'} />
      <Body>
        <Text style={styles.headerText}>Selecione os dias de treino:</Text>
        {/* Adicione os componentes necessários para selecionar os dias de treino */}
        {/* Por exemplo, botões ou checkboxes para cada dia da semana */}
        
        {/* Adicione um botão para voltar à página anterior (StarterName) */}
        <Button onPress={handleNavigateBack}>Voltar</Button>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default StarterDiasTreino;
