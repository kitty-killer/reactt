import axios from 'axios';
import store from './store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});


axiosInstance.interceptors.request.use((config) => {
  const { user } = store.getState().auth;
  if (user) {
    config.auth = {
      username: user.username,
      password: user.password, 
    };
  }
  return config;
});

export default axiosInstance;
