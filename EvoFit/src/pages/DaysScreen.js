import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { collection, doc, setDoc } from 'firebase/firestore'; // Importa doc e setDoc
import { db } from '../config/firebaseconfig'; 

export default function Days({ route }) {
    const { nome, userId } = route.params;
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const navigation = useNavigation();

    const toggleDay = (dia) => {
        if (diasSelecionados.includes(dia)) {
            setDiasSelecionados(diasSelecionados.filter((item) => item !== dia));
        } else {
            setDiasSelecionados([...diasSelecionados, dia]);
        }
    };

    const isSelected = (dia) => {
        return diasSelecionados.includes(dia);
    };

    const handleDaySelection = (dia) => {
        toggleDay(dia);
    };

    const handleAdvance = async () => {
        try {
            const treinoDocRef = doc(db, 'DiasTreino', userId); // Define o documento com o UID do usuário
            await setDoc(treinoDocRef, {
                userId: userId,
                diasTreino: diasSelecionados,
            }); // Define os dias de treino para o usuário

            console.log('Dias de treino salvos com sucesso para o usuário:', userId);
            navigation.navigate('Level', { userId: userId, nome: nome, diasSelecionados: diasSelecionados });      
        } catch (error) {
            console.error('Erro ao salvar dias de treino:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Dias de Treino" titleStyle={styles.title} />
                {diasSelecionados.length > 0 && (
                    <TouchableOpacity onPress={handleAdvance}>
                        <Image
                            source={require('../assets/seta-direita.png')}
                            style={{ width: 34, height: 34 }}
                        />
                    </TouchableOpacity>
                )}
            </Appbar.Header>
            <View style={styles.content}>
                <Text style={styles.headerText}>Olá, <Text style={styles.boldText}>{nome}</Text>, tudo bem?</Text>
                <Text style={styles.headerText}>Quais dias você pretende treinar?</Text>
                <View style={styles.buttonRow}>
                    {[1, 2, 3, 4, 5, 6, 0].map((dia) => (
                        <TouchableOpacity
                            key={dia}
                            style={[
                                styles.dayButton,
                                isSelected(dia) && styles.selectedButton,
                            ]}
                            onPress={() => handleDaySelection(dia)}
                        >
                            <Text style={styles.buttonText}>{getDiaSemana(dia)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const getDiaSemana = (dia) => {
    const diasSemana = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
    ];
    return diasSemana[dia];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#333',
        marginTop: 50,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '80%',
        marginTop: 20,
    },
    dayButton: {
        width: '48%',
        marginBottom: 10,
        backgroundColor: '#8c8c8c',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 12,
        marginHorizontal: 2,
    },
    selectedButton: {
        backgroundColor: '#780202',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#FFF',
    },
    title: {
        textAlign: 'center', 
    },
});
