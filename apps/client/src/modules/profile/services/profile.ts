import axios from "@/modules/shared/utils/axios";

export const updateProfile = async (profile: FormData) => {
  const { data } = await axios.patch("/user/profile", profile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
