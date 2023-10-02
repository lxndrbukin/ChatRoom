import mongoose, { Schema, mongo } from 'mongoose';
import { IFriendsList, Friend } from './types';

const FriendsListSchema = new Schema<IFriendsList>({
  userId: Number,
  friendsList: Array<Friend>,
  requestsList: Array<Friend>,
  sentRequests: Array<Friend>
});

export default mongoose.model<IFriendsList>('friendsList', FriendsListSchema);
