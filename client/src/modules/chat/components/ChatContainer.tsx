import { Chat } from "./Chat";
import { SOCKET_URL } from "@/consts";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Welcome } from "@/modules/shared/components";
import { useUserStore } from "@/modules/shared/store/user";
import { IContact } from "../modules/contacts/types/contacts";
import { Contacts } from "../modules/contacts/components/Contacts";
import { useContacts } from "../modules/contacts/hooks/useContacts";

const socket = io(`${SOCKET_URL}`);

export const ChatContainer = () => {
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
          <Chat
            socket={socket}
            currentUser={currentUser}
            handleContactClick={handleContactClick}
          />
        )}
      </div>
    </div>
  );
};
