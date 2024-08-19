import { Socket } from "socket.io-client";
import { Message } from "../types/messages";
import { RefObject, useEffect } from "react";
import { IContact } from "../../contacts/types/contacts";
import { useUserStore } from "@/modules/shared/store/user";
import { getMessages, addMessage } from "../services/messages";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

interface Params {
  socket: Socket;
  currentUser: IContact;
  scrollRef: RefObject<HTMLDivElement>;
}

export const useMessages = ({ currentUser, socket, scrollRef }: Params) => {
  const queryClient = useQueryClient();
  const { id } = useUserStore((state) => state);

  const { data: messages } = useQuery<Message[]>({
    queryKey: ["messages", currentUser],
    queryFn: () => getMessages({ from: id, to: currentUser.id }),
    refetchOnWindowFocus: false,
  });

  const { mutate: saveMessage } = useMutation({
    mutationFn: addMessage,
    onMutate: (message) => {
      const previousData = queryClient.getQueryData<Message[]>([
        "messages",
        currentUser,
      ]);
      if (previousData) {
        let imageUrl;
        if (message.get("image"))
          imageUrl = URL.createObjectURL(message.get("image") as File);
        queryClient.setQueryData(
          ["messages", currentUser],
          [
            ...previousData,
            {
              fromSelf: true,
              text: message.get("text"),
              image: imageUrl,
              createdAt: new Date(),
            },
          ],
        );
      }
    },
  });

  const handleSendMsg = async ({
    text,
    image,
  }: {
    text: string;
    image: File | null;
  }) => {
    const formData = new FormData();

    if (id) {
      formData.append("from", id);
      formData.append("text", text);
      formData.append("to", currentUser.id);
    }
    if (image) {
      formData.append("image", image);
    }

    socket.emit("send-msg", {
      text,
      image,
      from: id,
      to: currentUser.id,
    });

    saveMessage(formData);
  };

  useEffect(() => {
    let imageUrl: string;
    socket.on("send-msg", (message) => {
      if (message.image) {
        const blob = new Blob([message.image], { type: "image/png" });
        imageUrl = URL.createObjectURL(blob);
      }
      const previousData = queryClient.getQueryData<Message[]>([
        "messages",
        currentUser,
      ]);
      if (previousData) {
        queryClient.setQueryData(
          ["messages", currentUser],
          [
            ...previousData,
            {
              fromSelf: false,
              image: imageUrl,
              text: message.text,
              createdAt: new Date(),
            },
          ],
        );
      }
    });
    return () => URL.revokeObjectURL(imageUrl);
  }, [currentUser, queryClient, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, scrollRef]);

  return { messages, handleSendMsg };
};
