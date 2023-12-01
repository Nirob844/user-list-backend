import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String, required: true },
  domain: { type: String, required: true },
  available: { type: Boolean, required: true },
});

export const User = model<IUser, UserModel>('User', userSchema);
