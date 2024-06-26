import React, { useState }  from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ImageBackground} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackPramsList } from '../../routes/app.routes'

import { api } from '../../services/api'

export default function Dashboard(){
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  const [number, setNumber] = useState('');

  async function openOrder(){
    if(number === ''){
      return;
    }

    const response = await api.post('/ordertable', {
      table: Number(number)
    })

    //console.log(response.data);

    navigation.navigate('Order', { number: number, ordertable_id: response.data.id })

    setNumber('');

  }
  

  return(
    <ImageBackground source={require('../../assets/pngegg.png')} style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>

                <TextInput
                  placeholder="Numero da mesa"
                  placeholderTextColor="#4f4f4f"
                  style={styles.input}
                  keyboardType="numeric"
                  value={number}
                  onChangeText={setNumber}
                />

                <TouchableOpacity style={styles.button} onPress={openOrder}>
                  <Text style={styles.buttonText}>Abrir mesa</Text>
              </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fffdf2'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4f4f4f',
    marginBottom: 24,
  },
  input:{
    width: '90%',
    height: 60,
    backgroundColor: '#fff2cc',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#4f4f4f'
  },
  button:{
    width: '90%',
    height: 50,
    backgroundColor: '#ffbf00',
    borderRadius: 10,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
})