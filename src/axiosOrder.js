import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-store1.firebaseio.com/'
});

export default instance;
