import mongoose, { Schema } from 'mongoose';
import { UserStatus } from './types';
import { IUser } from './types';

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
    lastSeen: { type: Date, default: new Date() }
  },
  signedUp: { type: Date, default: new Date() },
});

export default mongoose.model<IUser>('user', UserSchema);