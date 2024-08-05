import { SOCKET_URL } from "@/consts";
import { io } from "socket.io-client";
import { IContact } from "@/types/user";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { useContacts } from "@/hooks/useContacts";
import { ChatContainer, Contacts, Welcome } from "@/components";

const socket = io(`${SOCKET_URL}`);

export const Chat = () => {
  const { contacts } = useContacts();
  const { id } = useUserStore((state) => state);
  const [currentUser, setCurrentUser] = useState<IContact | null>();
  const [currentActive, setCurrentActive] = useState<number | null>(null);

  useEffect(() => {
    socket.emit("add-user", id);
  }, [id]);

  const handleContactClick = (
    index: number | null,
    contact: IContact | null,
  ) => {
    setCurrentUser(contact);
    setCurrentActive(index);
  };

  return (
    <div className="grid w-[100vw] h-[100vh]">
      <div className="grid grid-cols-chat bg-zinc-800 w-full h-full rounded-lg relative overflow-hidden">
        <Contacts
          contacts={contacts}
          currentActive={currentActive}
          handleContactClick={handleContactClick}
        />
        {!currentUser ? (
          <Welcome />
        ) : (
          <ChatContainer
            socket={socket}
            currentUser={currentUser}
            handleContactClick={handleContactClick}
          />
        )}
      </div>
    </div>
  );
};
