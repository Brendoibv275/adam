import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ChatService {
  constructor(private aiService: AiService) {}

  async generateResponse(content: string) {
    try {
      const response = await this.aiService.generateResponse(content);
      return response;
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      throw error;
    }
  }
}