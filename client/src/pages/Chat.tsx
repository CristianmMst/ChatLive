import { SOCKET_URL } from "@/consts";
import { io } from "socket.io-client";
import { IContact } from "@/types/user";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { useContacts } from "@/hooks/useContacts";
import { ChatContainer, Contacts, LogOut, Welcome } from "@/components";

const socket = io(`${SOCKET_URL}`);

export const Chat = () => {
  const { contacts } = useContacts();
  const { id } = useUserStore((state) => state);
  const [currentUser, setCurrentUser] = useState<IContact | undefined>();

  useEffect(() => {
    socket.emit("add-user", id);
  }, [id]);

  const handleChatChange = (chat: IContact) => {
    setCurrentUser(chat);
  };

  return (
    <div className="grid w-[100vw] h-[100vh]">
      <div className="grid grid-cols-chat bg-zinc-800 w-full h-full rounded-lg animate-in relative">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {!currentUser ? (
          <Welcome />
        ) : (
          <ChatContainer currentUser={currentUser} socket={socket} />
        )}
        <LogOut />
      </div>
    </div>
  );
};
