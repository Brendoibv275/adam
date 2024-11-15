import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  isUser: boolean;

  @Prop()
  sessionId: string;

  @Prop()
  userId?: string; // Para futuro sistema de autenticação

  @Prop()
  context?: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
