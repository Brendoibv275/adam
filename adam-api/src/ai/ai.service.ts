import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';

  async generateResponse(message: string) {
    try {
      const response = await axios.post(`${this.ollamaUrl}/api/generate`, {
        model: 'mistral:7b-instruct',
        prompt: message,
        stream: false,
      });

      return {
        response: response.data.response,
        model: 'mistral:7b-instruct'
      };
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      throw error;
    }
  }
}