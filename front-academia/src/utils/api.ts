import axios from 'axios';

export const api = axios.create({
  //baseURL: 'http://localhost:3000/', // ajusta a tu backend
  //baseURL: 'https://f2jdn1l9-3000.brs.devtunnels.ms/',
  baseURL: "https://academia-nho8.onrender.com/"  // produccion
});