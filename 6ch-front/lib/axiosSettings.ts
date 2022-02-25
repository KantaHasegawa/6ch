import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 10000,
  withCredentials: true,
});

export default api;
