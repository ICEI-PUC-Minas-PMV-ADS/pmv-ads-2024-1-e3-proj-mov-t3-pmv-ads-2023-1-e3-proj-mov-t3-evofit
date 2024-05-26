import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, ProgressBarAndroid, Button } from "react-native";
import { collection, setDoc, getDocs, query, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseconfig';
import { Card, Title } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Workout() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [completedExercises, setCompletedExercises] = useState([]);
    const navigation = useNavigation();

    const fetchWorkouts = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("Usuário não está autenticado");
            }
            const userUid = user.uid;
    
            // Consulta para buscar o documento específico do usuário
            const docRef = doc(db, 'Treino', userUid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const workoutData = docSnap.data();
                const treinos = workoutData.treinos || [];
    
                const workoutsData = treinos.map(treino => ({
                    id: docSnap.id,
                    objetivo: workoutData.objetivo || '',
                    treino: treino
                }));
    
                setWorkouts(workoutsData);
            } else {
                console.log('Nenhum documento encontrado');
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar treinos:', error);
            setError(error.message);
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchWorkouts();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchWorkouts();
        }, [])
    );

    const handleSelectWorkout = (workout) => {
        setSelectedWorkout(workout);
        setModalVisible(true);
        setCompletedExercises(Array(workout.treino.exercicios.length).fill(0));
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedWorkout(null);
    };

    const handleExerciseProgress = (index) => {
        const updatedCompletedExercises = [...completedExercises];
        updatedCompletedExercises[index] += 1;
        setCompletedExercises(updatedCompletedExercises);
    };

    const handleFinishWorkout = async () => {
        const today = new Date().toISOString().split('T')[0];
    
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("Usuário não está autenticado");
            }
    
            const userUid = user.uid;
            console.log("UID do usuário:", userUid);
    
            // Referência para o documento do usuário na coleção RegistroTreino
            const registroTreinoRef = doc(db, "RegistroTreino", userUid);
    
            // Verifique se o documento do usuário já existe
            const docSnap = await getDoc(registroTreinoRef);
    
            if (docSnap.exists()) {
                // Atualize o documento existente adicionando a nova data ao array
                await updateDoc(registroTreinoRef, {
                    DiaTreinado: arrayUnion(today),
                    NomeTreinoRealizado: selectedWorkout ? `Treino ${String.fromCharCode(65 + workouts.indexOf(selectedWorkout))}` : '',
                });
            } else {
                // Crie um novo documento com o array de datas
                await setDoc(registroTreinoRef, {
                    DiaTreinado: [today],
                    NomeTreinoRealizado: selectedWorkout ? `Treino ${String.fromCharCode(65 + workouts.indexOf(selectedWorkout))}` : '',
                });
            }
    
            console.log("Documento atualizado/criado com sucesso");
        } catch (error) {
            console.error("Erro ao atualizar/ criar registro de treino:", error);
        }
    
        setModalVisible(false);
        navigation.navigate('Início', { screen: 'Gestão de Treinos' });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Erro: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Escolha seu Treino</Text>
            <Text style={styles.objective}>Objetivo: {workouts.length > 0 ? workouts[0].objetivo : ''}</Text>
            <ScrollView style={styles.scrollContainer}>
                {workouts.map((workout, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSelectWorkout(workout)}>
                        <Card style={styles.workoutCard}>
                            <View style={styles.cardContent}>
                                <Image source={require('../assets/linha.png')} style={styles.iconeCard} />
                                <Title style={styles.cardTreino}>Treino {String.fromCharCode(65 + index)}</Title>
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                            <Image source={require('../assets/fechar.png')} style={styles.closeButtonImage} />
                        </TouchableOpacity>
                        <ScrollView>
                            <Text style={styles.modalTitle}>Treino {selectedWorkout ? String.fromCharCode(65 + workouts.indexOf(selectedWorkout)) : ''}</Text>
                            {selectedWorkout && selectedWorkout.treino && selectedWorkout.treino.exercicios && selectedWorkout.treino.exercicios.map((exercicio, index) => (
                                <Card key={index} style={styles.exerciseCard}>
                                    <View style={styles.exerciseContent}>
                                        <Text style={styles.exerciseName}>{exercicio.nome}</Text>
                                        <Text>Carga: {exercicio.carga}</Text>
                                        <Text>Repetições: {exercicio.repeticoes}</Text>
                                        <Text>Séries: {exercicio.series}</Text>
                                        <ProgressBarAndroid
                                            styleAttr="Horizontal"
                                            indeterminate={false}
                                            progress={completedExercises[index] / exercicio.series}
                                        />
                                        <Button
                                            title="Evoluir Exercício"
                                            onPress={() => handleExerciseProgress(index)}
                                            disabled={completedExercises[index] >= exercicio.series}
                                            color={completedExercises[index] >= exercicio.series ? '#8c8c8c' : '#780202'}
                                        />
                                    </View>
                                </Card>
                            ))}
                        </ScrollView>
                        {completedExercises.some(exercise => exercise > 0) && (
                            <Button
                                title="Finalizar Treino"
                                onPress={handleFinishWorkout}
                                color={'#780202'}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 50,
    },
    objective: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 50,
        fontWeight: 'bold',
    },
    cardTreino: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 70,
    },
    iconeCard: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        marginRight: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1,
    },
    workoutCard: {
        marginBottom: 20,
        backgroundColor: '#780202',
        borderRadius: 10,
        padding: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, 
        width: '80%',
        height: '90%',


    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeButtonImage: {
        width: 24,
        height: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    exerciseCard: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        
    },
    exerciseContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
