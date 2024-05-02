import axios from 'axios';

const api = axios.create({
  //baseURL: 'https://dayfood-back-end.onrender.com/'
  baseURL: 'http://192.168.1.67:3000'
})

export { api };