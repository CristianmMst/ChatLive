import axios from "@/utils/axios";

export const getContacts = async (id: string | undefined) => {
  const { data } = await axios.get(`/user/contacts/${id}`);
  return data;
};
