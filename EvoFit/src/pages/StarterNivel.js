import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import { Button } from 'react-native-paper'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

const StarterNivel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nome, diasSelecionados } = route.params;
  const firstName = nome.split(' ')[0];

  const [nivelSelecionado, setNivelSelecionado] = useState(null);

  let frasesDiasTreino = '';
  switch (diasSelecionados.length) {
    case 1:
      frasesDiasTreino = 'Um dia já é um começo!';
      break;
    case 2:
      frasesDiasTreino = 'Você está no caminho certo!';
      break;
    case 3:
      frasesDiasTreino = 'Três dias já mostram seu comprometimento!';
      break;
    case 4:
      frasesDiasTreino = 'Quatro dias é um ótimo equilíbrio!';
      break;
    case 5:
      frasesDiasTreino = 'Estou impressionado com sua dedicação!';
      break;
    case 6:
      frasesDiasTreino = 'Você está realmente comprometido!';
      break;
    case 7:
      frasesDiasTreino = 'Você está totalmente focado e determinado!';
      break;
  }

  const handleNextAction = () => {
    if (!nivelSelecionado) {
      Alert.alert("Atenção", "Você precisa selecionar um nível de treino!");
      return;
    }
    navigation.navigate('StarterRecommendations',{ nome, diasSelecionados, nivelSelecionado});
    
  };

  const handleSelectNivel = (nivel) => {
    setNivelSelecionado(nivel);
  };

  const isSelected = (nivel) => {
    return nivel === nivelSelecionado;
  };

  const handleNavigateBack = () => {
    navigation.goBack(); 
  };

  return (
    <Container style={styles.container}>
      <Header title={'Habilidade'} goBack={handleNavigateBack}>
        <Appbar.Action icon="chevron-right" onPress={handleNextAction} />
      </Header>
      <Body>
        <Text style={styles.headerText}>Muito bem, {firstName}. {frasesDiasTreino}</Text>
        <Text style={styles.headerText}>Qual é o seu nível de treinamento?</Text>
        
        <View style={styles.buttonWrap}>
          {['Iniciante', 'Intermediário', 'Avançado'].map((nivel, index) => (
            <Button
              key={index}
              style={[styles.dayButton, isSelected(nivel) && styles.selectedButton]}
              mode="contained"
              onPress={() => handleSelectNivel(nivel)}
            >
              {nivel}
            </Button>
          ))}
        </View>
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
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonWrap: {
    alignContent: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    marginTop: 50,
    width: '48%',
    marginBottom: 10,
    backgroundColor: '#8c8c8c',
  },
  selectedButton: {
    backgroundColor: '#780202',
  },
});

export default StarterNivel;
