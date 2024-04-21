import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { Button, Avatar, Card, IconButton, DataTable } from 'react-native-paper';
import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import presetWorkouts from '../../presetWorkouts.json'; 

const StarterRecommendations = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nome, diasSelecionados, nivelSelecionado } = route.params;
  const firstName = nome.split(' ')[0];

  const [selectedTreinoId, setSelectedTreinoId] = useState(null);
  const [selectedTreino, setSelectedTreino] = useState(null);

  useEffect(() => {
    // Limpa a seleção do treino ao montar o componente
    setSelectedTreinoId(null);
    setSelectedTreino(null);
  }, []);

  const handleSelectTreino = (treinoId) => {
    if (selectedTreinoId === treinoId) {
      // Desmarca o treino se já estiver selecionado
      setSelectedTreinoId(null);
      setSelectedTreino(null);
    } else {
      // Seleciona o treino
      const treinoSelecionado = presetWorkouts.find(treino => treino.id === treinoId);
      if (treinoSelecionado) {
        setSelectedTreinoId(treinoId);
        setSelectedTreino(treinoSelecionado);
      }
    }
  };

  const handleNextAction = () => {
    navigation.navigate('MyWorkouts', { nivelSelecionado, selectedTreino });
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <Header title={'Sugestão de treino'} goBack={handleNavigateBack}>
        <Appbar.Action icon="chevron-right" onPress={handleNextAction} />
      </Header>
      <Body>
        <Text style={styles.headerText}>Opções recomendadas para o seu nível.</Text>
        
        {selectedTreino && (
          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Exercício</DataTable.Title>
                <DataTable.Title numeric>Séries</DataTable.Title>
                <DataTable.Title numeric>Repetições</DataTable.Title>
              </DataTable.Header>

              {selectedTreino.exercises.map(exercicio => (
                <DataTable.Row key={exercicio.id}>
                  <DataTable.Cell>{exercicio.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{exercicio.sets}</DataTable.Cell>
                  <DataTable.Cell numeric>{exercicio.reps}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        )}

        {/* Renderizando as opções de treino */}
        {presetWorkouts.map(treino => (
          <View key={treino.id}>
            <Card.Title
              title={treino.name}
              subtitle={"Nível: " + nivelSelecionado}
              left={(props) => (<Avatar.Icon {...props} backgroundColor='#780202' icon={getIconForCategory(treino.name)} />)}
              right={(props) => (
                <IconButton
                  {...props}
                  icon={selectedTreinoId === treino.id ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  onPress={() => handleSelectTreino(treino.id)}
                />
              )}
            />
          </View>
        ))}
      </Body>
    </Container>
  );
};

// Função para retornar o ícone com base na categoria do treino
const getIconForCategory = (name) => {
  switch (name) {
    case 'Hipertofia Muscular':
      return 'dumbbell';
    case 'Emagrecimento':
      return 'scale-balance';
    case 'Definição Muscular':
      return 'run-fast';
    default:
      return 'dumbbell'; 
  }
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
    paddingBottom: 50,
  },
});

export default StarterRecommendations;
