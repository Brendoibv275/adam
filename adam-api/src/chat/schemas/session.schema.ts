import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message } from './message.schema';

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ required: true })
  sessionId: string;

  @Prop()
  userId?: string;

  @Prop()
  title?: string;

  @Prop([{ type: Message }])
  messages: Message[];

  @Prop()
  lastContext?: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session); 