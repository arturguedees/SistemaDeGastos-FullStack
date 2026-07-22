import axios from 'axios';

// URL do back-end em .NET
export const api = axios.create({
  baseURL: 'http://localhost:5057', 
});