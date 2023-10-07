import mongoose, { Schema } from 'mongoose';
import { IFriendsList, UserId, Requests } from './types';

const FriendsListSchema = new Schema<IFriendsList>({
  userId: Number,
  friendsList: Array<UserId>,
  requestsList: Array<Requests>,
  sentRequests: Array<UserId>
});

export default mongoose.model<IFriendsList>('friendsList', FriendsListSchema);
