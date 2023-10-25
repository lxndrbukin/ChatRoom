import mongoose, { Schema } from 'mongoose';
import { IChat, ChatMemberId, ChatMessage, Schemas } from './types';

const ChatSchema: Schema = new Schema<IChat>({
  chatId: Number,
  memberIds: Array<ChatMemberId>,
  messages: Array<ChatMessage>,
  password: { type: String, required: false },
});

export default mongoose.model<IChat>(Schemas.Chat, ChatSchema);