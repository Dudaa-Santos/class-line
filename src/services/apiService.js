import axios from 'axios';

axios.defaults.withCredentials = true;

export const httpClient = axios.create({
  baseURL: "https://classline-backend.onrender.com",
  withCredentials: true
});
