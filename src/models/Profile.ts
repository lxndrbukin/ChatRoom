import mongoose, { Schema } from 'mongoose';
import { IProfile, UserStatus, Schemas } from './types';

const ProfileSchema: Schema = new Schema<IProfile>({
  userId: Number,
  fullName: {
    firstName: String,
    lastName: String,
  },
  email: String,
  domain: { type: String, default: null },
  dob: {
    dd: { type: String, default: null },
    mm: { type: String, default: null },
    yyyy: { type: String, default: null }
  },
  mainPhoto: { type: String, default: 'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg' },
  about: {
    occupation: {
      desc: { type: String, default: null },
      type: { type: String, default: null }
    },
    info: {
      brief: { type: String, default: null }
    },
    personal: {
      country: { type: String, default: null },
      city: { type: String, default: null }
    }
  },
  status: {
    onlineStatus: { type: String, default: UserStatus.Online },
    previousOnlineStatus: { type: String, default: UserStatus.Online },
    lastSeen: { type: Number, default: new Date().getTime() }
  },
  signedUp: { type: Number, default: new Date().getTime() },
});

export default mongoose.model<IProfile>(Schemas.Profile, ProfileSchema);