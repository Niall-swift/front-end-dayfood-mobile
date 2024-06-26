import React, {useState, useEffect}  from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ImageBackground
} from 'react-native'

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import { ModalPicker } from '../../components/ModalPicker'
import { ListItem } from '../../components/ListItem'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackPramsList }  from '../../routes/app.routes'

type RouteDetailParams = {
  Order:{
    number: string | number;
    ordertable_id: string;
  }
}

export type CategoryProps = {
  id: string;
  name: string;
}

type ProductProps = {
  id: string;
  name: string;
}

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState('1')
  const [items, setItems] = useState<ItemProps[]>([]);


  // carregando categoria
  useEffect(()=> {
    async function loadInfo(){
      const response = await api.get('/listcategory')
      
      setCategory(response.data);
      setCategorySelected(response.data[0])

    }

    loadInfo();
  }, [])

  // caregando produtos
  useEffect(() => {
    async function loadProducts(){
      const response = await api.get('/product', {
        params:{
          category_id: categorySelected?.id
        }
      })

      setProducts(response.data);
      setProductSelected(response.data[0])

    }

    loadProducts();

  }, [categorySelected])


  // deletando mesa
  async function handleCloseOrder(){
    try{
      await api.delete('/order/delete', {
        params:{
          ordertable_id: route.params?.ordertable_id
        }
      })
      navigation.goBack();

    }catch(err){
      console.log(err)
    }

  }

  function handleChangeCategory(item: CategoryProps){
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps){
    setProductSelected(item);
  }

  // adcionando um produto nessa mesa
  async function handleAdd(){
    const response = await api.post('/order/add', {
      ordertable_id: route.params?.ordertable_id,
      product_id: productSelected?.id,
      amount: Number(amount)
    })

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount
    }


    setItems(oldArray => [...oldArray, data])

  }

  // removendo item da mesa
  async function handleDeleteItem(item_id: string){
    await api.delete('/order/remove', {
      params:{
        item_id: item_id
      }
    })

    // após remover da api removemos esse item da nossa lista de items
    let removeItem = items.filter( item => {
      return (item.id !== item_id)
    })

    setItems(removeItem)

  }


  function handleFinishOrder(){
    navigation.navigate("FinishOrder", { 
      number: route.params?.number, 
      ordertable_id: route.params?.ordertable_id
    } )
  }


  return(
    <ImageBackground source={require('../../assets/bg-icons-2.png')} style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#FF3F4b" />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true) }>
          <Text style={{ color: '#4f4f4f' }}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={ () => setModalProductVisible(true)} >
          <Text style={{ color: '#4f4f4f' }}>
            {productSelected?.name}
          </Text>
        </TouchableOpacity>        
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: '60%', textAlign: 'center' } ]}
          placeholderTextColor="#4f4f4f"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 } ]}
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text> 
        </TouchableOpacity>
      </View>


      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id }
        renderItem={ ({ item }) =>  <ListItem data={item} deleteItem={handleDeleteItem} /> }
      />


      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >

        <ModalPicker
          handleCloseModal={ () => setModalCategoryVisible(false) }
          options={category}
          selectedItem={ handleChangeCategory }
        />

      </Modal>


      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >

        <ModalPicker
          handleCloseModal={ () => setModalProductVisible(false) }
          options={products}
          selectedItem={ handleChangeProduct }
        />        

      </Modal>

    
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fffdf2',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%'
  },
  header:{
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title:{
    fontSize:30,
    fontWeight: 'bold',
    color: '#4f4f4f',
    marginRight: 14
  },
  input:{
    backgroundColor: '#fff2cc',
    borderRadius: 12,
    width: '100%',
    height: 50,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#4f4f4f',
    fontSize: 20,
  },
  qtdContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  qtdText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4f4f4f',
    textAlign: 'center',
    marginTop: -20
  },
  actions:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd:{
    width: '20%',
    backgroundColor: '#3fffa3',
    borderRadius: 12,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button:{
    backgroundColor: '#ffbf00',
    borderRadius: 12,
    height: 45,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})