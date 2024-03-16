import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/routes/index.js";
import Autenticacao from './src/contexts/index.js';

export default function App() {
  return (
    <NavigationContainer>
      <Autenticacao>
        <StatusBar style="auto" backgroundColor='#fff' barStyle="dark-content" />
        <Routes />
      </Autenticacao>
    </NavigationContainer>

  );
}
