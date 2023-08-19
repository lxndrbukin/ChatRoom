import mongoose, { Schema } from 'mongoose';
import { IUser } from './types';

const UserSchema: Schema = new Schema<IUser>({
  userId: Number,
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: String,
});

export default mongoose.model<IUser>('user', UserSchema);