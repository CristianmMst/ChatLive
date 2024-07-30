import { User } from "../types/auth";
import { Schema, model } from "mongoose";

export const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      require: true,
    },
    password: {
      type: String,
      require: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      required: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default model("User", userSchema);
