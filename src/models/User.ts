import mongoose, { Schema } from 'mongoose';
import { UserRoles } from './types';
import { IUser } from './types';

const UserSchema: Schema = new Schema<IUser>({
  userId: Number,
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: UserRoles.User }
});

export default mongoose.model<IUser>('user', UserSchema);