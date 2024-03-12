import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StarterIntro from '../pages/StarterIntro';
import StarterName from '../pages/StarterName';
import StarterDiasTreino from '../pages/StarterDiasTreino'; // Importe a tela StarterDiasTreino

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="StarterIntro">
      <Stack.Screen 
        name="StarterIntro" 
        component={StarterIntro}
        options={{ header: () => null }} 
      />
      <Stack.Screen 
        name="StarterName" 
        component={StarterName} 
        options={{ header: () => null }} 
      />
      <Stack.Screen 
        name="StarterDiasTreino" 
        component={StarterDiasTreino} // Adicione a tela StarterDiasTreino aqui
        options={{ header: () => null }} 
      />
    </Stack.Navigator>
  );
}

export default MainStack;
