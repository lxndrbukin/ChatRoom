import mongoose, { Schema } from 'mongoose';
import { UserStatus, IUser, Schemas } from './types';

const UserSchema: Schema = new Schema<IUser>({
  userId: Number,
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  mainPhoto: { type: String, default: 'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg' },
  domain: { type: String, default: null },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: {
    onlineStatus: { type: String, default: UserStatus.Online },
    previousOnlineStatus: { type: String, default: UserStatus.Online },
    lastSeen: { type: Number, default: new Date().getTime() }
  },
  signedUp: { type: Number, default: new Date().getTime() },
});

export default mongoose.model<IUser>(Schemas.User, UserSchema);