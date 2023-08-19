import mongoose, { Schema } from 'mongoose';
import { IChat, ChatMember, ChatMessage } from './types';

const ChatSchema: Schema = new Schema<IChat>({
  chatId: Number,
  chatName: { type: String, required: true },
  members: Array<ChatMember>,
  messages: Array<ChatMessage>,
  password: { type: String, required: false },
});

export default mongoose.model<IChat>('chat', ChatSchema);