import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import StarterIntro from '../pages/StarterIntro';
import StarterName from '../pages/StarterName';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (

      
      <Stack.Navigator initialRouteName="StarterIntro">
        <Stack.Screen 
        name="StarterIntro" 
        component={StarterIntro}
        options={{header:() => null
        }} 
        />
        <Stack.Screen 
        name="StarterName" 
        component={StarterName} 
       options={{header:() => null
        }} 
        />
       
      </Stack.Navigator>
   

  );
}

export default MainStack;