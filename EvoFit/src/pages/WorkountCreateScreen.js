import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, ScrollView, Alert, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';

export default function WorkoutCreate({ route }) {
    const navigation = useNavigation();
    const { userId, nome, diasSelecionados, selectedLevel } = route.params;
    const [objetivo, setObjetivo] = useState('');
    const [treinos, setTreinos] = useState([{ nomeTreino: '', exercicios: [{ nome: '', carga: '', series: '', repeticoes: '' }] }]);

    const handleAddWorkout = () => {
        setTreinos([...treinos, { nomeTreino: '', exercicios: [{ nome: '', carga: '', series: '', repeticoes: '' }] }]);
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

        let allSeriesGreaterThanZero = true;
        treinos.forEach(treino => {
            treino.exercicios.forEach(exercicio => {
                if (parseInt(exercicio.series) <= 0) {
                    allSeriesGreaterThanZero = false;
                }
            });
        });

        if (!allSeriesGreaterThanZero) {
            Alert.alert('Erro', 'Série deve ser maior que zero.');
            return;
        }

        try {
            const treinoData = {
                userId: userId,
                objetivo: objetivo,
                treinos: treinos
            };

            await setDoc(doc(db, 'Treino', userId), treinoData);

            console.log('Treino personalizado salvo com sucesso!');
            Alert.alert('Sucesso', 'Treino salvo com sucesso!');
            
            navigation.navigate('Gestão de Treinos', {
                userId: userId,
                nome: nome,
                diasSelecionados: diasSelecionados,
                selectedLevel: selectedLevel,
                treinoData: treinoData
            });
        } catch (error) {
            console.error('Erro ao salvar treino personalizado: ', error);
            Alert.alert('Atenção', 'Ocorreu um erro ao salvar o treino. Por favor, tente novamente mais tarde.');
        }
    };

    const getTreinoNome = (index) => {
        return String.fromCharCode(65 + index);
    };

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/de-volta.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
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
                            <TouchableOpacity onPress={() => handleRemoveWorkout(index)}>
                                <Image
                                    source={require('../assets/lixeira-de-reciclagem.png')}
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
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
                                            <TouchableOpacity onPress={() => handleRemoveExercise(index, exercicioIndex)}>
                                                <Image
                                                    source={require('../assets/excluir.png')}
                                                    style={{ width: 24, height: 24 }}
                                                />
                                            </TouchableOpacity>
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
                                                    if (text === '' || parseInt(text) > 0) {
                                                        const updatedTreinos = [...treinos];
                                                        updatedTreinos[index].exercicios[exercicioIndex].series = text;
                                                        setTreinos(updatedTreinos);
                                                    }
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
                                <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(index)}>
                                    <Text style={styles.addButtonText}>Adicionar Exercício</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
                    <Text style={styles.addButtonText}>Adicionar Treino</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveCustomWorkouts}>
                    <Text style={styles.saveButtonText}>Salvar Treino Personalizado</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    smallInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
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
    },
    exercicioContainer: {
        marginBottom: 10,
    },
    exercicioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
});
