import mongoose, { Schema } from 'mongoose';
import { IChat, ChatMemberId, ChatMessage, Schemas } from './types';

const ChatsListSchema = new Schema({
  userId: Number,
  chatsList: Array<IChat>,
});

export default mongoose.model(Schemas.ChatsList, ChatsListSchema);
