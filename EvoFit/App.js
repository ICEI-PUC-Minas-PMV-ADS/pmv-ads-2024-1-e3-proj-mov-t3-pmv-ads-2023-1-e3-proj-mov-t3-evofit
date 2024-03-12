import React from 'react';
import {View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/navigation/Main';

const App = () => {
  return (
   <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
