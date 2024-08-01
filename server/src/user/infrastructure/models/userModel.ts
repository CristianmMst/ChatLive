import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  id: string;
  email: string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model<UserDocument>("User", UserSchema);
