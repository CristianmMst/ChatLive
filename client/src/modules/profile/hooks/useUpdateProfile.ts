import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../services/profile";
import { User, useUserStore } from "@/modules/shared/store/user";
import { ChangeEvent, useState } from "react";

export const useUpdateProfile = () => {
  const [image, setImage] = useState<File>();
  const { username, avatar, setUser } = useUserStore((state) => state);

  const [newUsername, setNewUsername] = useState({
    modify: false,
    value: username,
  });
  const [newAvatar, setNewAvatar] = useState<string | undefined>(avatar);

  const { mutate: update } = useMutation({
    mutationFn: updateProfile,
    onMutate: () => {
      setImage(undefined);
    },
    onSuccess: (user: User) => {
      setUser(user);
      setNewAvatar(user.avatar);
    },
  });

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const blobAvatar = URL.createObjectURL(image);
      setImage(image);
      setNewAvatar(blobAvatar);
    }
  };

  return {
    update,
    newUsername,
    setNewUsername,
    newAvatar,
    image,
    handleChangeAvatar,
  };
};
