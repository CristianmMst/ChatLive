import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      text: {
        type: String,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
    },
    users: Array,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const messageModel = model("Messages", messageSchema);
