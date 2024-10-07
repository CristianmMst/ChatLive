import axios from "@/modules/shared/utils/axios";

export const getContacts = async (id: string | undefined) => {
  const { data } = await axios.get(`/user/contacts/${id}`);
  return data;
};
