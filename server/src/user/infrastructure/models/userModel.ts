import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  id: string | undefined;
  email: string;
  username: string;
  avatar: string | null;
  password: string | null;
  googleId: string | null;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, sparse: true },
    googleId: { type: String, required: false, unique: true, sparse: true },
    avatar: { type: String, required: false, default: null },
    username: { type: String, required: true },
    password: { type: String, required: false },
  },
  { versionKey: false },
);

export const userModel = mongoose.model<UserDocument>("User", UserSchema);
