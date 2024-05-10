import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar, IconButton } from 'react-native-paper';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseconfig'; // Assuming auth is imported from firebaseconfig.js

export default function WorkoutCreate({ route }) {
    const navigation = useNavigation();
    const [objetivo, setObjetivo] = useState('');
    const [treinos, setTreinos] = useState([{ nome: '', exercicios: [{ nome: '', carga: '', series: '', repeticoes: '' }] }]);

    const handleAddWorkout = () => {
        setTreinos([...treinos, { nome: '', exercicios: [{ nome: '', carga: '', series: '', repeticoes: '' }] }]);
    };

    const handleAddExercise = (index) => {
        const updatedTreinos = [...treinos];
        updatedTreinos[index].exercicios.push({ nome: '', carga: '', series: '', repeticoes: '' });
        setTreinos(updatedTreinos);
    };

    const handleRemoveWorkout = (index) => {
        const updatedTreinos = [...treinos];
        updatedTreinos.splice(index, 1);
        setTreinos(updatedTreinos);
    };

    const handleRemoveExercise = (treinoIndex, exercicioIndex) => {
        const updatedTreinos = [...treinos];
        updatedTreinos[treinoIndex].exercicios.splice(exercicioIndex, 1);
        setTreinos(updatedTreinos);
    };

    const handleSaveCustomWorkouts = async () => {
        if (objetivo.trim() === '') {
            Alert.alert('Erro', 'Por favor, preencha o campo objetivo.');
            return;
        }

        let hasExercise = false;
        treinos.forEach(treino => {
            if (treino.exercicios.length > 0) {
                treino.exercicios.forEach(exercicio => {
                    if (exercicio.nome.trim() !== '' && exercicio.carga.trim() !== '' && exercicio.series.trim() !== '' && exercicio.repeticoes.trim() !== '') {
                        hasExercise = true;
                    }
                });
            }
        });

        if (!hasExercise) {
            Alert.alert('Atenção', 'Você deve preencher pelo menos um exercício com Nome, Carga, Séries e Repetições.');
            return;
        }

        try {
            const user = auth.currentUser; // Assuming you are using Firebase authentication
            const userId = user.uid;

            const treinoData = {
                userId: userId,
                objetivo: objetivo,
                treinos: treinos
            };
            const docRef = await addDoc(collection(db, 'Treino'), treinoData);
            console.log('Treino personalizado salvo com ID: ', docRef.id);
            Alert.alert('Sucesso', 'Treino salvo com sucesso!');
            navigation.navigate('Home'); // Redireciona para a tela Home após salvar
        } catch (error) {
            console.error('Erro ao salvar treino personalizado: ', error);
            Alert.alert('Atenção', 'Ocorreu um erro ao salvar o treino. Por favor, tente novamente mais tarde.');
        }
    };

    const getTreinoNome = (index) => {
        return String.fromCharCode(65 + index); // Retorna 'A', 'B', 'C', ...
    };

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Seleção de Treino" titleStyle={styles.title} />
            </Appbar.Header>
            <View style={styles.content}>
                <Text style={styles.text}>Personalize seu treino</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Objetivo"
                    value={objetivo}
                    onChangeText={setObjetivo}
                />
                {treinos.map((treino, index) => (
                    <View key={index} style={styles.treinoContainer}>
                        <TouchableOpacity style={styles.treinoRow} onPress={() => setTreinos(prevState => {
                            const updatedTreinos = [...prevState];
                            updatedTreinos[index].showExercicios = !updatedTreinos[index].showExercicios;
                            return updatedTreinos;
                        })}>
                            <Text style={styles.nomeTreino}>{`Treino ${getTreinoNome(index)}`}</Text>
                            <IconButton
                                icon="delete"
                                color="#780202"
                                size={24}
                                style={styles.deleteButton}
                                onPress={() => handleRemoveWorkout(index)}
                            />
                        </TouchableOpacity>
                        {treino.showExercicios && (
                            <View>
                                {treino.exercicios.map((exercicio, exercicioIndex) => (
                                    <View key={exercicioIndex} style={styles.exercicioContainer}>
                                        <View style={styles.exercicioHeader}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Nome do Exercício"
                                                value={exercicio.nome}
                                                onChangeText={(text) => {
                                                    const updatedTreinos = [...treinos];
                                                    updatedTreinos[index].exercicios[exercicioIndex].nome = text;
                                                    setTreinos(updatedTreinos);
                                                }}
                                            />
                                            <IconButton
                                                icon="delete"
                                                color="#780202"
                                                size={24}
                                                onPress={() => handleRemoveExercise(index, exercicioIndex)}
                                            />
                                        </View>
                                        <View style={styles.inputRow}>
                                            <TextInput
                                                style={styles.smallInput}
                                                placeholder="Carga"
                                                keyboardType="numeric"
                                                value={exercicio.carga}
                                                onChangeText={(text) => {
                                                    const updatedTreinos = [...treinos];
                                                    updatedTreinos[index].exercicios[exercicioIndex].carga = text;
                                                    setTreinos(updatedTreinos);
                                                }}
                                            />
                                            <TextInput
                                                style={styles.smallInput}
                                                placeholder="Séries"
                                                keyboardType="numeric"
                                                value={exercicio.series}
                                                onChangeText={(text) => {
                                                    const updatedTreinos = [...treinos];
                                                    updatedTreinos[index].exercicios[exercicioIndex].series = text;
                                                    setTreinos(updatedTreinos);
                                                }}
                                            />
                                            <TextInput
                                                style={styles.smallInput}
                                                placeholder="Repetições"
                                                keyboardType="numeric"
                                                value={exercicio.repeticoes}
                                                onChangeText={(text) => {
                                                    const updatedTreinos = [...treinos];
                                                    updatedTreinos[index].exercicios[exercicioIndex].repeticoes = text;
                                                    setTreinos(updatedTreinos);
                                                }}
                                            />
                                        </View>
                                    </View>
                                ))}
                                <IconButton
                                    icon="plus"
                                    color="#780202"
                                    size={24}
                                    onPress={() => handleAddExercise(index)}
                                />
                            </View>
                        )}
                    </View>
                ))}
                <View style={styles.bottomButtons}>
                    <Button
                        title="+ Adicionar Treino"
                        onPress={handleAddWorkout}
                        color="#780202"
                        style={styles.button}
                    />
                </View>
                <View style={styles.bottomButtons}>
                    <Button
                        title="Salvar Treino"
                        onPress={handleSaveCustomWorkouts}
                        color="#780202"
                        style={styles.button}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        padding: 20,
    },
    title: {
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#FFF'
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    treinoContainer: {
        marginBottom: 20,
    },
    treinoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    nomeTreino: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exercicioContainer: {
        marginBottom: 10,
    },
    exercicioHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    smallInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    inputRow: {
        flexDirection: 'row',
    },
    deleteButton: {
        marginLeft: 10,
    },
    bottomButtons: {
        marginTop: 20,
        alignItems: 'center',
    },
});
