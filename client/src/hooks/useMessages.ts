import { IContact } from "@/types/user";
import { Socket } from "socket.io-client";
import { Message } from "@/types/messages";
import { useUserStore } from "@/store/user";
import { RefObject, useEffect } from "react";
import { addMessage, getMessages } from "@/services/messages";
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
          [...previousData, { fromSelf: true, message }]
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

    saveMessage({ from: id, to: currentUser.id, message });
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
          [...previousData, { fromSelf: false, message }]
        );
      }
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { messages, handleSendMsg };
};
