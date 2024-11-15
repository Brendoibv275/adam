import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const sendMessage = async (content: string) => {
  try {
    const response = await api.post('/chat', { content });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};

export default api;