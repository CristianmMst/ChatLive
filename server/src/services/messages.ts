import { Message } from "../types/messages";
import messagesModel from "../models/messages";

export const addMessage = async ({ from, to, message }: Message) => {
  const data = await messagesModel.create({
    message: {
      text: message,
    },
    users: [from, to],
    sender: from,
  });
  return data;
};

export const getAllMessages = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  const messages = await messagesModel
    .find({
      users: {
        $all: [from, to],
      },
    })
    .sort({ updateAt: 1 });
  const projectMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message?.text,
    };
  });
  return projectMessages;
};
