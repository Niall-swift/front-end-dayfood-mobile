
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes/index'

import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <AuthProvider>
          <StatusBar backgroundColor="#fffdf2" barStyle="dark-content" translucent={false} hidden={true} />
          <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

