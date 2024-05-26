import React, { useState, useEffect } from 'react';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';
import { useNavigation } from '@react-navigation/native';

function SettingScreen({ setUser }) {
    const [newPassword, setNewPassword] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [nivelAtividade, setNivelAtividade] = useState('');
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid); 
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        console.log('Dados do usuário:', userData);
                        setAltura(userData.altura || '');
                        setPeso(userData.peso || '');
                        setNivelAtividade(userData.nivelAtividade || '');
                        setUsername(userData.username || '');
                    } else {
                        console.log('O documento do usuário não foi encontrado');
                    }
                } else {
                    console.log('Usuário não autenticado');
                }
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
            }
        };
        loadUserData();
    }, []);

    const reauthenticate = async (currentPassword) => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
    };

    const handleSaveChanges = async () => {
        try {
            // Reautenticar o usuário antes de fazer alterações sensíveis
            if (currentPassword) {
                await reauthenticate(currentPassword);
            } else {
                throw new Error('A senha atual é necessária para reautenticação.');
            }

            // Atualizar informações do perfil no Firebase Authentication
            await updateProfile(auth.currentUser, {
                displayName: username,
            });

            // Atualizar dados do usuário no Firestore
            const userDocRef = doc(db, 'users', auth.currentUser.uid); 
            await updateDoc(userDocRef, {
                altura: altura,
                peso: peso,
                nivelAtividade: nivelAtividade,
                username: username
            });

            // Se uma nova senha foi fornecida, atualizar a senha de autenticação
            if (newPassword) {
                await updatePassword(auth.currentUser, newPassword);
            }

            // Limpar os campos de senha e nova senha após salvar
            setCurrentPassword('');
            setNewPassword('');

            // Exibir uma mensagem de sucesso
            Alert.alert('Sucesso', 'As alterações foram salvas com sucesso.');
        } catch (error) {
            console.error('Erro ao salvar as alterações:', error);
            let errorMessage = 'A senha atual está incorreta.';
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'A senha atual está incorreta.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'A nova senha é muito fraca.';
            }
            Alert.alert('Erro', errorMessage);
        }
    };

    const handleNavigateToWorkoutCreateScreen = () => {
        navigation.navigate('WorkoutEdit');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Alterar Dados</Text>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Alterar nome"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Peso</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Alterar peso"
                        value={peso}
                        onChangeText={setPeso}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha Atual</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha atual"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nova Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Alterar senha"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={true}
                    />
                </View>
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
                <Button title="Salvar" onPress={handleSaveChanges} color="#780202"/>
                <TouchableOpacity style={styles.editButton} onPress={handleNavigateToWorkoutCreateScreen}>
                    <Text style={styles.editButtonText}>Editar Treino</Text>
                </TouchableOpacity>
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
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
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
    editButton: {
        backgroundColor: '#780202',
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SettingScreen;
