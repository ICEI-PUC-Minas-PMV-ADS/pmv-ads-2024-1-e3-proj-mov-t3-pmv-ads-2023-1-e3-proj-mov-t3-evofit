import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar, Card, Avatar, Checkbox, IconButton } from 'react-native-paper';
import presetWorkouts from '../presetWorkouts.json';
import { collection, addDoc } from 'firebase/firestore'; // Importe as funções do Firestore
import { db } from '../config/firebaseconfig'; // Importe db do arquivo de configuração
import { auth } from '../config/firebaseconfig'; // Importe auth do arquivo de configuração

export default function RecommendationsScreen({ route }) {
    const navigation = useNavigation();
    const { nome, diasSelecionados } = route.params;
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const flatListRef = useRef(null);

    const handleSelectWorkout = (workout) => {
        setSelectedWorkout(selectedWorkout === workout ? null : workout);
        // Scroll to selected workout
        const index = presetWorkouts.findIndex(item => item.objetivo === workout.objetivo);
        flatListRef.current.scrollToIndex({ animated: true, index });
    };

    const handleNextAction = async () => {
        if (!selectedWorkout) {
            alert('Você precisa selecionar um treino!');
            return;
        }

        try {
            // Adicionar os dados do treino à coleção "Treino" no Firestore
            const treinoRef = collection(db, 'Treino');
            const docRef = await addDoc(treinoRef, {
                nomeUsuario: nome,
                emailUsuario: auth.currentUser.email,
                objetivo: selectedWorkout.objetivo,
                listaExercicios: selectedWorkout.treinos,
                dataCriacao: new Date().toISOString()
            });

            console.log('Dados do treino adicionados com sucesso ao Firestore');

            // Adicionar os exercícios à coleção "Exercicio"
            const exerciciosRef = collection(db, 'Exercicio');
            for (const treino of selectedWorkout.treinos) {
                for (const exercise of treino.exercises) {
                    await addDoc(exerciciosRef, {
                        treinoId: docRef.id,
                        nomeExercicio: exercise.name,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        
                    });
                }
            }

            console.log('Exercícios adicionados com sucesso à coleção "Exercicio"');

            navigation.navigate('Home', { selectedWorkout, nome, diasSelecionados });
        } catch (error) {
            console.error('Erro ao adicionar registro de treino:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Seleção de Treino" titleStyle={styles.title} />
                {selectedWorkout && (
                    <IconButton
                        icon="chevron-right"
                        onPress={handleNextAction}
                    />
                )}
            </Appbar.Header>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.text}>Excelente, <Text style={styles.nameText}>{nome}</Text>!</Text>
                    <Text style={styles.subText}>Selecione um treino sugerido ou crie um treino personalizado:</Text>
                    <FlatList
                        ref={flatListRef}
                        data={presetWorkouts}
                        keyExtractor={(item) => item.objetivo}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectWorkout(item)} style={styles.cardContainer}>
                                <Card elevation={3} style={[styles.card, selectedWorkout === item && styles.selectedCard]}>
                                    <Card.Title
                                        title={item.objetivo}
                                        titleStyle={{ color: '#FFF', fontWeight: 'bold' }}
                                        subtitle="Nível: Todos"
                                        subtitleStyle={{ color: '#FFF' }}
                                        left={(props) => (
                                            <Avatar.Icon
                                                {...props}
                                                backgroundColor="#780202"
                                                icon="dumbbell"
                                            />
                                        )}
                                        right={(props) => (
                                            <Checkbox
                                                {...props}
                                                color="#FFF"
                                                uncheckedColor="#FFF"
                                                status={selectedWorkout === item ? 'checked' : 'unchecked'}
                                                onPress={() => handleSelectWorkout(item)}
                                            />
                                        )}
                                    />
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                    {selectedWorkout && (
                        <View style={styles.selectedWorkoutContainer}>
                            <Text style={styles.selectedWorkoutTitle}>Objetivo Selecionado:</Text>
                            <Text style={styles.selectedWorkoutName}>{selectedWorkout.objetivo}</Text>
                            <Text style={styles.selectedWorkoutSubtitle}>Treinos:</Text>
                            {selectedWorkout.treinos.map((treino, index) => (
                                <View key={index}>
                                    <Text style={styles.selectedWorkoutSubtitle}>{treino.name}</Text>
                                    {treino.exercises.map((exercise, i) => (
                                        <Text key={i} style={styles.selectedWorkoutExercise}>{`${exercise.name} - Séries: ${exercise.sets}, Repetições: ${exercise.reps}`}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Criar Treino Personalizado"
                            onPress={() => navigation.navigate('WorkoutCreate')}
                            color="#780202"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
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
    text: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    subText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    nameText: {
        fontWeight: 'bold',
    },
    cardContainer: {
        marginBottom: 10,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#780202',
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: '#FFF',
    },
    header: {
        backgroundColor: '#FFF',
    },
    title: {
        textAlign: 'center', 
    },
    selectedWorkoutContainer: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#780202',
        borderRadius: 10,
        marginBottom: 30,
    },
    selectedWorkoutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    selectedWorkoutName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    selectedWorkoutSubtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },
    selectedWorkoutExercise: {
        fontSize: 14,
        marginBottom: 5,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
