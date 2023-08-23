import axios from "@/utils/axios";

interface ISendMessage {
  message?: string;
  from?: string;
  to?: string;
}

export const addMessage = async ({ from, to, message }: ISendMessage) => {
  return await axios.post("/messages/addMessage", {
    from,
    to,
    message,
  });
};

export const getMessages = async ({ from, to }: ISendMessage) => {
  const { data } = await axios.post("messages/getMessages", {
    from,
    to,
  });
  return data;
};
