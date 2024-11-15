import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async processMessage(@Body() body: { content: string }) {
    return await this.chatService.generateResponse(body.content);
  }
}