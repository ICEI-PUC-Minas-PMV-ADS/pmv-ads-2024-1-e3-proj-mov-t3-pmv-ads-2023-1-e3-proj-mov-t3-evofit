import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, Switch, TouchableOpacity, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';
import { useNavigation } from '@react-navigation/native';

function SignUpScreen({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [nivelAtividade, setNivelAtividade] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            if (!username || !email || !password) {
                Alert.alert(
                    'Campos obrigatórios',
                    'Por favor, preencha todos os campos obrigatórios. Nome de usuário, email e senha são obrigatórios.'
                );
                return;
            }

            if (!isValidEmail(email)) {
                Alert.alert(
                    'Email inválido',
                    'Por favor, insira um email válido.'
                );
                return;
            }

            if (password.length < 6) {
                Alert.alert(
                    'Senha muito curta',
                    'A senha deve ter no mínimo 6 caracteres.'
                );
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await addUserToFirestore(user.uid);

            setUsername('');
            setEmail('');
            setPassword('');
            setDataNascimento('');
            setSexo('');
            setAltura('');
            setPeso('');
            setObjetivo('');
            setNivelAtividade('');
            setShowAdditionalInfo(false);

            console.log('Usuário registrado com sucesso:', { username, email });

            navigation.navigate('Days', { nome: username }); // Passa o nome cadastrado como parâmetro
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
        }
    };

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const addUserToFirestore = async (userId) => {
        const usersCollectionRef = collection(db, 'users');
        await addDoc(usersCollectionRef, { 
            username, 
            email,
            dataNascimento,
            sexo,
            altura,
            peso,
            objetivo,
            nivelAtividade
        });

        console.log('Usuário adicionado ao Firestore:', { username, email, dataNascimento, sexo, altura, peso, objetivo, nivelAtividade });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Evolua com EvoFit</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View style={styles.additionalInfoContainer}>
                    <Text>Outras informações:</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={showAdditionalInfo ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setShowAdditionalInfo(!showAdditionalInfo)}
                        value={showAdditionalInfo}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showAdditionalInfo}
                    onRequestClose={() => setShowAdditionalInfo(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShowAdditionalInfo(false)}
                            >
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Data de nascimento"
                                value={dataNascimento}
                                onChangeText={setDataNascimento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Sexo"
                                value={sexo}
                                onChangeText={setSexo}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Altura"
                                value={altura}
                                onChangeText={setAltura}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Peso"
                                value={peso}
                                onChangeText={setPeso}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Objetivo"
                                value={objetivo}
                                onChangeText={setObjetivo}
                            />
                            <View style={styles.checkboxContainer}>
                                <Text style={styles.checkboxLabel}>Nível de Atividade:</Text>
                                <View style={styles.checkbox}>
                                    <Button 
                                        title="Sedentário" 
                                        onPress={() => setNivelAtividade('Sedentário')} 
                                        color={nivelAtividade === 'Sedentário' ? '#780202' : '#8c8c8c'} 
                                    />
                                    <Button 
                                        title="Moderado" 
                                        onPress={() => setNivelAtividade('Moderado')} 
                                        color={nivelAtividade === 'Moderado' ? '#780202' : '#8c8c8c'} 
                                    />
                                    <Button 
                                        title="Ativo" 
                                        onPress={() => setNivelAtividade('Ativo')} 
                                        color={nivelAtividade === 'Ativo' ? '#780202' : '#8c8c8c'} 
                                    />
                                </View>
                            </View>
                            <Button title="Salvar" onPress={() => setShowAdditionalInfo(false)} color="#780202" />
                        </View>
                    </View>
                </Modal>
                <Button title="Salvar" onPress={handleLogin} color="#780202"/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    form: {
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    additionalInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxContainer: {
        marginBottom: 10,
    },
    checkboxLabel: {
        marginBottom: 5,
    },
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#780202', 
    },
});

export default SignUpScreen;
