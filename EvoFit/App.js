import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper'; 
import LoginScreen from './src/pages/LoginScreen';
import SignUpScreen from './src/pages/SignUpScreen'; 
import HomeScreen from './src/pages/HomeScreen';
import DaysScreen from './src/pages/DaysScreen'; 
import LevelScreen from './src/pages/LevelScreen';
import RecommendationsScreen from './src/pages/RecommendationsScreen';
import WorkountCreateScreen from './src/pages/WorkountCreateScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ header: () => null }}
        />
        <Stack.Screen 
          name="Cadastre-se" 
          component={SignUpScreen}
          options={{
            headerTitleAlign: 'center', 
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Days" 
          component={DaysScreen} 
          options={{ header: () => null }}
        />
        <Stack.Screen 
          name="Level" 
          component={LevelScreen} 
          options={{ header: () => null }}
        />
        <Stack.Screen 
          name="Recommendations" 
          component={RecommendationsScreen} 
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="WorkoutCreate"
          component={WorkountCreateScreen}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
