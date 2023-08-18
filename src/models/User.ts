import mongoose, { Schema } from 'mongoose';
import { IUser, UserRoles } from './types';

const UserSchema: Schema = new Schema<IUser>({
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  role: String,
});

export default mongoose.model<IUser>('user', UserSchema);