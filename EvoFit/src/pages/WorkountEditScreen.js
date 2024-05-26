import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, ScrollView, Alert, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { collection, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../config/firebaseconfig';

export default function WorkoutDetails({ route }) {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [treinos, setTreinos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    setUserId(userId);

                    // Query para buscar os dados do usuário e do treino na coleção 'Treino'
                    const treinosQuery = query(collection(db, 'Treino'), where('userId', '==', userId));
                    const querySnapshot = await getDocs(treinosQuery);
                    const treinosData = [];

                    querySnapshot.forEach((doc) => {
                        treinosData.push(doc.data());
                    });

                    if (treinosData.length > 0) {
                        // Define o objetivo e os treinos com base nos dados encontrados no Firestore
                        setObjetivo(treinosData[0].objetivo);
                        setTreinos(treinosData[0].treinos);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar dados do treino:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do treino. Por favor, tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSaveChanges = async () => {
        try {
            // Verifica se há algum campo de Séries vazio
            const emptySeries = treinos.some(treino => treino.exercicios.some(exercicio => exercicio.series === ''));
            if (emptySeries) {
                Alert.alert('Erro', 'O campo Séries deve ser preenchido.');
                return;
            }

            // Atualiza os dados do treino no Firestore com as informações editadas
            const treinoRef = doc(db, 'Treino', userId);
            await updateDoc(treinoRef, {
                objetivo: objetivo,
                treinos: treinos
            });

            Alert.alert('Sucesso', 'As alterações foram salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar as alterações. Por favor, tente novamente mais tarde.');
        }
    };

    const handleAddWorkout = () => {
        const newTreino = { nome: '', exercicios: [{ nome: '', carga: '', series: '', repeticoes: '' }] };
        setTreinos([...treinos, newTreino]);
    };

    const handleRemoveWorkout = (index) => {
        const updatedTreinos = [...treinos];
        updatedTreinos.splice(index, 1);
        setTreinos(updatedTreinos);
    };

    const handleAddExercise = (index) => {
        const updatedTreinos = [...treinos];
        updatedTreinos[index].exercicios.push({ nome: '', carga: '', series: '', repeticoes: '' });
        setTreinos(updatedTreinos);
    };

    const handleRemoveExercise = (treinoIndex, exercicioIndex) => {
        const updatedTreinos = [...treinos];
        updatedTreinos[treinoIndex].exercicios.splice(exercicioIndex, 1);
        setTreinos(updatedTreinos);
    };

    const getTreinoNome = (index) => {
        return String.fromCharCode(65 + index); // Retorna 'A', 'B', 'C', ...
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
                        <TouchableOpacity style={styles.treinoRow} onPress={() => handleRemoveWorkout(index)}>
                            <Text style={styles.nomeTreino}>{`Treino ${getTreinoNome(index)}`}</Text>
                            <TouchableOpacity onPress={() => handleRemoveWorkout(index)}>
                                <Image
                                    source={require('../assets/lixeira-de-reciclagem.png')}
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => handleAddExercise(index)}>
                            <Image
                                source={require('../assets/sinal-de-adicao.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
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
                        onPress={handleSaveChanges}
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
    bottomButtons: {
        marginTop: 20,
        alignItems: 'center',
    },
});
