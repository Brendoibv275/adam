import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';

  async generateResponse(message: string) {
    try {
      const systemPrompt = "Você é um assistente em português chamado ADAM. Sempre responda em português do Brasil de forma clara e profissional.";
      
      const response = await axios.post(`${this.ollamaUrl}/api/generate`, {
        model: 'mistral:7b-instruct',
        prompt: `${systemPrompt}\n\nUsuário: ${message}\n\nAssistente:`,
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