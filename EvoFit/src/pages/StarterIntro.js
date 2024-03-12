import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';

import DefaultButton from '../components/DefaultButton';

import { useNavigation } from '@react-navigation/native';

const StarterIntro = () =>{
  
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.containerIntro}>
      <Text style={styles.headerText}> Maximize seu treino </Text>
      <View style={styles.welcomeImage}>
        <Image source={require('../assets/EvoFit-Logo-Png.png')} style={styles.welcomeLogo} />
      </View>
      
      <View style={styles.beginConfigArea}>
        <DefaultButton
          width='100%'
          bgColor='#780202'
          underlayColor='#8C0C0C'
          onPress={() => navigation.navigate('StarterName')}
        >
          <Text style={styles.buttonText}>Iniciar Configuração</Text>
        </DefaultButton>
      </View>
    </SafeAreaView>
  );
}
export default StarterIntro;

const styles = StyleSheet.create({
  containerIntro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f',
    marginLeft: 30,
    marginRight: 30,
  },
  headerText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 50,
  },
  welcomeImage: {
    flex:1,
    justifyContent: 'center',
  },
  welcomeLogo: {
    width: 400,
    height: 400,
  },
  buttonText: {
    color: '#FFF',
    fontWeight:'bold',
  },
  beginConfigArea: {
    width: '100%',
    marginBottom: 70,
  },
});
