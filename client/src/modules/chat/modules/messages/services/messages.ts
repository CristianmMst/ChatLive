import axios from "@/modules/shared/utils/axios";

interface ISendMessage {
  to?: string;
  from?: string;
  text?: string;
  image?: string;
}

export const addMessage = async (message: FormData) => {
  return await axios.post("/messages/addMessage", message, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMessages = async ({ from, to }: ISendMessage) => {
  const { data } = await axios.post("messages/getMessages", {
    from,
    to,
  });
  return data;
};
