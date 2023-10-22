import mongoose, { Schema } from 'mongoose';
import { IProfile } from './types';
import { UserStatus } from './types';

const ProfileSchema: Schema = new Schema<IProfile>({
  userId: Number,
  fullName: {
    firstName: String,
    lastName: String,
  },
  email: String,
  domain: { type: String, default: null },
  age: { type: Number, default: null },
  mainPhoto: { type: String, default: 'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg' },
  about: {
    occupation: {
      desc: { type: String, default: null },
      type: { type: String, default: null }
    },
    info: {
      brief: { type: String, default: null }
    }
  },
  status: {
    onlineStatus: { type: String, default: UserStatus.Online },
    previousOnlineStatus: { type: String, default: UserStatus.Online },
    lastSeen: { type: Number, default: new Date().getTime() }
  },
  signedUp: { type: Number, default: new Date().getTime() },
});

export default mongoose.model<IProfile>('profile', ProfileSchema);