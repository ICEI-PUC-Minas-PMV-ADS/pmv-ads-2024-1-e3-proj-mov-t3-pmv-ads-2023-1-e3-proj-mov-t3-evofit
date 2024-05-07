import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                console.log(user);
                
                navigation.navigate('Home');
            })
            .catch((error) => {
                
                const errorCode = error.code;
                let errorMessage = '';
                switch (errorCode) {
                    case 'auth/invalid-email':
                        errorMessage = 'Email inválido. Por favor, verifique e tente novamente.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'Este usuário foi desabilitado. Por favor, entre em contato com o suporte.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'Usuário não encontrado. Por favor, verifique e tente novamente.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Senha incorreta. Por favor, verifique e tente novamente.';
                        break;
                    default:
                        errorMessage = 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.';
                }
                Alert.alert('Erro de autenticação', errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Maximize seu treino</Text>
            <Image
                source={require('../assets/EvoFitLogo.png')}
                style={styles.logo}
            />
            <Text style={styles.subTitle}>Login</Text>
            <View style={styles.form}>
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
                <Button title="Entrar" onPress={handleLogin} color="#780202" />
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Não tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastre-se')}>
                        <Text style={styles.signupLink}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    logo: {
        width: 200,
        height: 160,
        marginBottom: 20,
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
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    signupText: {
        marginRight: 5,
    },
    signupLink: {
        color: '#780202',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
