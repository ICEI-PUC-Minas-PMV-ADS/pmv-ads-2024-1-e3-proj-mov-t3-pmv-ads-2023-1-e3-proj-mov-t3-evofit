import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { collection, doc, setDoc } from 'firebase/firestore'; // Importa doc e setDoc
import { db } from '../config/firebaseconfig'; 
import { auth } from '../config/firebaseconfig'; 

export default function Level({ route }) {
    const navigation = useNavigation();
    const { nome, diasSelecionados, userId } = route.params;
    const [selectedLevel, setSelectedLevel] = useState(null);

    const getDaysMessage = () => {
        const diasSelecionadosCount = diasSelecionados.length;
        switch (diasSelecionadosCount) {
            case 1:
                return 'Um dia já é um começo!';
            case 2:
                return 'Você está no caminho certo!';
            case 3:
                return 'Três dias já mostram seu comprometimento!';
            case 4:
                return 'Quatro dias é um ótimo equilíbrio!';
            case 5:
                return 'Estou impressionado com sua dedicação!';
            case 6:
                return 'Você está realmente comprometido!';
            case 7:
                return 'Você está totalmente focado e determinado!';
            default:
                return '';
        }
    };

    const handleTrainingLevelSelect = (level) => {
        setSelectedLevel(level);
    };

    const handleAdvance = async () => {
        try {
            const nivelTreinoDocRef = doc(db, 'NivelTreino', userId); // Define o documento com o UID do usuário
            await setDoc(nivelTreinoDocRef, {
                userId: userId,
                nivelTreino: selectedLevel,
            }); // Define o nível de treino para o usuário neste documento

            navigation.navigate('WorkoutCreate', { userId: userId, nome: nome, diasSelecionados: diasSelecionados, selectedLevel });
        } catch (error) {
            console.error('Erro ao adicionar registro de treino:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Habilidade" titleStyle={styles.title} />
                {selectedLevel && (
                    <TouchableOpacity onPress={handleAdvance}>
                        <Image
                            source={require('../assets/seta-direita.png')}
                            style={{ width: 34, height: 34 }}
                        />
                    </TouchableOpacity>
                )}
            </Appbar.Header>
            <View style={styles.content}>
                <Text style={styles.text}>Muito bem, <Text style={styles.boldText}>{nome}</Text>. {getDaysMessage()}</Text>
                <Text style={styles.subText}>Qual é o seu nível de treinamento?</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            title="Iniciante" 
                            onPress={() => handleTrainingLevelSelect('Iniciante')} 
                            color={selectedLevel === 'Iniciante' ? '#780202' : '#8c8c8c'}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="Intermediário" 
                            onPress={() => handleTrainingLevelSelect('Intermediário')} 
                            color={selectedLevel === 'Intermediário' ? '#780202' : '#8c8c8c'}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="Avançado" 
                            onPress={() => handleTrainingLevelSelect('Avançado')} 
                            color={selectedLevel === 'Avançado' ? '#780202' : '#8c8c8c'}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 50,
    },
    text: {
        fontSize: 20,
        marginBottom: 40,
        textAlign: 'center',
    },
    subText: {
        fontSize: 18,
        marginBottom: 50,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        width: '50%',
        marginBottom: 10,
        borderRadius: 10,
    },
    header: {
        backgroundColor: '#FFF',
    },
    title: {
        textAlign: 'center', 
    },
    boldText: {
        fontWeight: 'bold',
    },
});
