import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import { Button } from 'react-native-paper'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

const StarterDiasTreino = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nome } = route.params;
  const firstName = nome.split(' ')[0];

  const [diasSelecionados, setDiasSelecionados] = useState([]);

  const handleNextAction = () => {
    if (!diasSelecionados.length) {
      Alert.alert("Atenção", "Você precisa treinar pelo menos 1 dia!");
      return;
    }
    navigation.navigate('StarterNivel', { nome, diasSelecionados});
  };

  const toggleDay = (dia) => {
    if (diasSelecionados.includes(dia)) {
      setDiasSelecionados(diasSelecionados.filter(item => item !== dia));
    } else {
      setDiasSelecionados([...diasSelecionados, dia]);
    }
  };

  const isSelected = (dia) => {
    return diasSelecionados.includes(dia);
  };

  const handleNavigateBack = () => {
    navigation.goBack(); 
  };

  return (
    <Container style={styles.container}>
      <Header title={'Dias de Treino'} goBack={handleNavigateBack}>
        <Appbar.Action icon="chevron-right" onPress={handleNextAction} />
      </Header>
      <Body>
        <Text style={styles.headerText}>Olá, {firstName}, tudo bem? </Text>
        <Text style={styles.headerText}>Quais dias da semana você pretende treinar?</Text>
        
        <View style={styles.buttonRow}>
          {[1, 2, 3, 4, 5, 6, 0].map(dia => (
            <Button
              key={dia}
              style={[styles.dayButton, isSelected(dia) && styles.selectedButton]}
              mode="contained"
              onPress={() => toggleDay(dia)}
            >
              {getDiaSemana(dia)}
            </Button>
          ))}
        </View>
      </Body>
    </Container>
  );
};

const getDiaSemana = (dia) => {
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return diasSemana[dia];
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
  buttonRow: {
    flexDirection: 'row',
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

export default StarterDiasTreino;
