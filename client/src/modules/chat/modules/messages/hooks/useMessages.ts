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
    onMutate: ({ message }) => {
      const previousData = queryClient.getQueryData<Message[]>([
        "messages",
        currentUser,
      ]);
      if (previousData) {
        queryClient.setQueryData(
          ["messages", currentUser],
          [...previousData, { fromSelf: true, message, createdAt: new Date() }],
        );
      }
    },
  });

  const handleSendMsg = async (message: string) => {
    socket.emit("send-msg", {
      message,
      from: id,
      to: currentUser.id,
    });

    saveMessage({
      from: id,
      to: currentUser.id,
      message,
    });
  };

  useEffect(() => {
    socket.on("send-msg", (message: string) => {
      const previousData = queryClient.getQueryData<Message[]>([
        "messages",
        currentUser,
      ]);
      if (previousData) {
        queryClient.setQueryData(
          ["messages", currentUser],
          [
            ...previousData,
            { fromSelf: false, message, createdAt: new Date() },
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
