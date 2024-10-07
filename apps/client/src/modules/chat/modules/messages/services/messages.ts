import axios from "@/modules/shared/utils/axios";

export const addMessage = async (message: FormData) => {
  const { data } = await axios.post("/messages/addMessage", message, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getMessages = async (from: string, to: string) => {
  const { data } = await axios.post("messages/getMessages", {
    from,
    to,
  });
  return data;
};
