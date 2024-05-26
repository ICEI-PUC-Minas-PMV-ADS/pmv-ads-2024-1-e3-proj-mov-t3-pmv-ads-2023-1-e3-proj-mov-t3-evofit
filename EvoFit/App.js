import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import LoginScreen from './src/pages/LoginScreen';
import SignUpScreen from './src/pages/SignUpScreen'; 
import HomeScreen from './src/pages/HomeScreen';
import DaysScreen from './src/pages/DaysScreen'; 
import LevelScreen from './src/pages/LevelScreen';
import WorkountCreateScreen from './src/pages/WorkountCreateScreen';
import WorkountEditScreen from './src/pages/WorkountEditScreen';
import Workout from './src/pages/Workout';
import SettingScreen from './src/pages/SettingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Função HomeTabs modificada para aceitar parâmetros e passá-los para as telas do Tab.Navigator
function HomeTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? require('./src/assets/silhueta-de-icone-de-casa.png') : require('./src/assets/silhueta-de-icone-de-casa.png');
          } else if (route.name === 'Treinar') {
            iconName = focused ? require('./src/assets/treino.png') : require('./src/assets/treino.png');
          } else if (route.name === 'Configurações') {
            iconName = focused ? require('./src/assets/engrenagem.png') : require('./src/assets/engrenagem.png');
          }

          // Você pode retornar qualquer componente que você gosta aqui!
          return <Image source={iconName} style={{ width: 24, height: 24 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 16, 
        },
      }}
    >
      {/* Passando os parâmetros para cada tela do Tab Navigator */}
      <Tab.Screen 
        name="Início" 
        component={HomeScreen} 
        initialParams={route.params} 
        options={{ header: () => null }} 
      />
      <Tab.Screen 
        name="Treinar" 
        component={Workout} 
        initialParams={route.params} 
        options={{ header: () => null }} 
      />
      <Tab.Screen 
        name="Configurações" 
        component={SettingScreen} 
        initialParams={route.params} 
        options={{ header: () => null }} 
      />
    </Tab.Navigator>
  );
}

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
          name="Gestão de Treinos" 
          component={HomeTabs} 
          options={({ route }) => ({
            header: () => null,
            // Passando os parâmetros recebidos para HomeTabs
            initialParams: route.params,
          })}
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
          name="WorkoutCreate"
          component={WorkountCreateScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="WorkoutEdit" // Adicione a nova rota para a página de edição
          component={WorkountEditScreen} // Componente da página de edição
          options={{ header: () => null }} // Opções de navegação
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
