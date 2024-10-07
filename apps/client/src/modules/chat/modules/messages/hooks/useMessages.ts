import { Socket } from "socket.io-client";
import { Message } from "../types/messages";
import { RefObject, useEffect } from "react";
import { IContact } from "../../contacts/types/contacts";
import { useUserStore } from "@/modules/shared/store/user";
import { getMessages, addMessage } from "../services/messages";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

interface Props {
  socket: Socket;
  currentUser: IContact;
  scrollRef: RefObject<HTMLDivElement>;
}

export const useMessages = ({ currentUser, socket, scrollRef }: Props) => {
  const queryClient = useQueryClient();
  const { id } = useUserStore((state) => state);

  const { data: messages } = useQuery<Message[]>({
    queryKey: ["messages", currentUser],
    queryFn: () => {
      if (id && currentUser.id) {
        return getMessages(id, currentUser.id);
      }
      return [];
    },
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
    onSuccess: ({ message }) => {
      socket.emit("send-msg", {
        to: message.to,
        from: message.from,
        text: message.text,
        image: message.image,
      });
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

    saveMessage(formData);
  };

  useEffect(() => {
    socket.on("send-msg", (message) => {
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
              text: message.text,
              image: message.image,
              createdAt: new Date(),
            },
          ],
        );
      }
    });
  }, [currentUser, queryClient, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, scrollRef]);

  return { messages, handleSendMsg };
};
