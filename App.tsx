import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';
import { registerRootComponent } from 'expo';
import { AuthProvider } from './src/contexts/AuthContext';

registerRootComponent(App)

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <AuthProvider>
        <StatusBar backgroundColor="#fffdf2" barStyle="dark-content" translucent={false} hidden={true} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

