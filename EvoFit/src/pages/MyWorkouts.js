import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { Button, Avatar, Card, IconButton, DataTable } from 'react-native-paper';
import Container from '../components/Container';
import Header from '../components/Header';
import Body from '../components/Body';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import presetWorkouts from '../../presetWorkouts.json'; 

const MyWorkouts = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nome, diasSelecionados, nivelSelecionado } = route.params;

  const [selectedTreinoId, setSelectedTreinoId] = useState(null);
  const [selectedTreino, setSelectedTreino] = useState(null);

  const handleNextAction = () => {
    navigation.navigate('MyWorkouts', { nivelSelecionado, selectedTreino });
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleEditTreino = (treinoId) => {
    // Implemente a lógica para editar o treino com o ID fornecido
    // Redirecione para a página de edição do treino passando o ID do treino
    navigation.navigate('EditTreino', { treinoId });
  };

  const handleDeleteTreino = (treinoId) => {
    // Implemente a lógica para excluir o treino com o ID fornecido
    // Exiba um alerta de confirmação e, se confirmado, exclua o treino
    Alert.alert(
      'Excluir Treino',
      'Tem certeza de que deseja excluir este treino?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => confirmDeleteTreino(treinoId) },
      ]
    );
  };

  const confirmDeleteTreino = (treinoId) => {
    // Implemente a lógica para confirmar a exclusão do treino com o ID fornecido
    // Atualize o estado de treinos se necessário
    Alert.alert('Treino excluído com sucesso!');
  };

  return (
    <Container style={styles.container}>
      <Header title={'Meus Treinos'} goBack={handleNavigateBack}>
        <Appbar.Action icon="chevron-right" onPress={handleNextAction} />
      </Header>
      <Body>
        {/* Renderizando as opções de treino */}
        {presetWorkouts.map(treino => (
          <View key={treino.id}>
            <Card.Title
              title={treino.name}
              subtitle={"Nível: " + nivelSelecionado}
              left={(props) => (<Avatar.Icon {...props} backgroundColor='#780202' icon={getIconForCategory(treino.name)} />)}
              right={(props) => (
                <View style={{ flexDirection: 'row' }}>
                  <IconButton
                    icon="pencil"
                    onPress={() => handleEditTreino(treino.id)}
                  />
                  <IconButton
                    icon="delete"
                    onPress={() => handleDeleteTreino(treino.id)}
                  />
                  <IconButton
                    icon={selectedTreinoId === treino.id ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    onPress={() => setSelectedTreinoId(treino.id)}
                  />
                </View>
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

export default MyWorkouts;
