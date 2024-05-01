
import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'

import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <StatusBar backgroundColor="#fffdf2" barStyle="dark-content" translucent={false} hidden={true} />
          <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

