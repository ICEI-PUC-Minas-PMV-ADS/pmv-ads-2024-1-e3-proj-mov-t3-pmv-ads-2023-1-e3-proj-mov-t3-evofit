import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { collection, addDoc } from 'firebase/firestore'; // Importe as funções do Firestore
import { db } from '../config/firebaseconfig'; // Importe db do arquivo de configuração
import { auth } from '../config/firebaseconfig'; // Importe auth do arquivo de configuração

export default function Level({ route }) {
    const navigation = useNavigation();
    const { nome, diasSelecionados } = route.params;
    const [selectedLevel, setSelectedLevel] = useState(null);

    // Função para retornar a mensagem baseada na quantidade de dias selecionados
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
        // Avançar para a próxima tela e passar os dados selecionados
        setSelectedLevel(level);
    };

    const handleAdvance = async () => {
        try {
            // Adicionar os dados do treino à coleção "Treino" no Firestore
            const treinoRef = collection(db, 'Treino');
            await addDoc(treinoRef, {
                nomeUsuario: nome,
                emailUsuario: auth.currentUser.email,
                nivelTreino: selectedLevel,
                diasTreino: diasSelecionados,
                dataCriacao: new Date().toISOString()
            });

            navigation.navigate('Recommendations', { nome, diasSelecionados, selectedLevel });
        } catch (error) {
            console.error('Erro ao adicionar registro de treino:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Habilidade" titleStyle={styles.title} />
                {selectedLevel && (
                    <Appbar.Action icon="arrow-right" onPress={handleAdvance} />
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
        justifyContent: 'center', // Centraliza os itens verticalmente
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
