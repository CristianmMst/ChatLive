import axios from "@/modules/shared/utils/axios";

interface ISendMessage {
  text?: string;
  from?: string;
  to?: string;
}

export const addMessage = async ({ from, to, text }: ISendMessage) => {
  return await axios.post("/messages/addMessage", {
    from,
    to,
    text,
  });
};

export const getMessages = async ({ from, to }: ISendMessage) => {
  const { data } = await axios.post("messages/getMessages", {
    from,
    to,
  });
  console.log(data);
  return data;
};
