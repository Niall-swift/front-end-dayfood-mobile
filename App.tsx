import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';

import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        console.log("Preparando a tela de apresentação...");
        await SplashScreen.preventAutoHideAsync();
        console.log("Tela de apresentação preparada.");
        setTimeout(async () => {
          console.log("Ocultando a tela de apresentação...");
          await SplashScreen.hideAsync();
          console.log("Tela de apresentação oculta.");
        }, 2000);
      } catch (e) {
        console.error("Erro ao preparar a tela de apresentação:", e);
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <AuthProvider>
        <StatusBar backgroundColor="#fffdf2" barStyle="dark-content" translucent={false} hidden={true} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

