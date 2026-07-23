import axios from 'axios';

// URL do back-end em .NET (URL do Render que é o serviço de hospedagem que estou usando para o deploy do projeto)
export const api = axios.create({
  baseURL: 'https://sistemadegastos-fullstack.onrender.com', 
});