import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Message } from './schemas/message.schema';
import { Session } from './schemas/session.schema';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private readonly aiService: AiService,
  ) {}

  async processMessage(content: string, sessionId?: string) {
    try {
      // Criar nova sessão se não existir
      if (!sessionId) {
        sessionId = uuidv4();
      }

      // Buscar sessão existente ou criar nova
      let session = await this.sessionModel.findOne({ sessionId });
      if (!session) {
        session = await this.sessionModel.create({
          sessionId,
          messages: [],
        });
      }

      // Salvar mensagem do usuário
      const userMessage = await this.messageModel.create({
        content,
        isUser: true,
        sessionId,
      });

      // Gerar resposta do Adam
      const response = await this.aiService.generateResponse(content);

      // Salvar resposta do Adam
      const adamMessage = await this.messageModel.create({
        content: response,
        isUser: false,
        sessionId,
      });

      // Atualizar sessão
      session.messages.push(userMessage, adamMessage);
      await session.save();

      return {
        success: true,
        sessionId,
        message: content,
        response,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Erro:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getSessionHistory(sessionId: string) {
    return this.sessionModel
      .findOne({ sessionId })
      .populate('messages')
      .exec();
  }
}
