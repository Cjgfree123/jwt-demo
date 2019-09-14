import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';

axios.interceptors.request.use((config) => {
  console.log(1);
  return config;
});

axios.interceptors.request.use((config) => {
  console.log(2);
  return config;
});

export default axios;
