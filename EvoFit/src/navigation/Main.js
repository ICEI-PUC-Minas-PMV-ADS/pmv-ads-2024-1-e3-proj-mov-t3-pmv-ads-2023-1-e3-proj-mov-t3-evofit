import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StarterIntro from '../pages/StarterIntro';
import StarterName from '../pages/StarterName';
import StarterDiasTreino from '../pages/StarterDiasTreino'; 
import StarterNivel from '../pages/StarterNivel';
import StarterRecommendations from '../pages/StarterRecommendations';
import MyWorkouts from '../pages/MyWorkouts';

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
        component={StarterDiasTreino} 
        options={{ header: () => null }} 
      />
      <Stack.Screen 
        name="StarterNivel" 
        component={StarterNivel} 
        options={{ header: () => null }} 
      />
      <Stack.Screen 
        name="StarterRecommendations" 
        component={StarterRecommendations} 
        options={{ header: () => null }} 
      />
      <Stack.Screen 
        name="MyWorkouts" 
        component={MyWorkouts} 
        options={{ header: () => null }} 
      />
</Stack.Navigator>
    
    
  );
}

export default MainStack;
