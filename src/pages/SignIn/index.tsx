import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignIn(){
  
  const { signIn, loadingAuth} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(email)

  async function handleLogin(){

    if(email === '' || password === ''){
      return;
    }

    await signIn({ email, password })
    
  }


  return(
    <ImageBackground source={require('../../assets/pngegg.png')} style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../../assets/Captura de tela 2024-03-24 185252.png')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"   
          style={styles.input}     
          placeholderTextColor="#4f4f4f"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Sua senha"      
          style={styles.input}   
          placeholderTextColor="#4f4f4f"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}          
        />     

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          { loadingAuth ? (
            <ActivityIndicator size={25} color="#FFF"/>
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>   
      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#fffdf2'
  },
  logo:{
    marginBottom: 18,
    width: 170,
    height: 170,
    borderRadius: 20
  },
  inputContainer:{
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input:{
    width: '95%',
    height: 50,
    backgroundColor: '#fff2cc',
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 8,
    color: '#4f4f4f',
  },
  button:{
    width: '95%',
    height: 50,
    backgroundColor: '#ffbf00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#FFF'
  }
})