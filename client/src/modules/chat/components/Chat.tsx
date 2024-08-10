import { Input } from "./";
import { useRef } from "react";
import { Socket } from "socket.io-client";
import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IContact } from "../modules/contacts/types/contacts";
import { Messages } from "../modules/messages/components/Messages";
import { useMessages } from "../modules/messages/hooks/useMessages";

interface Props {
  socket: Socket;
  currentUser: IContact;
  handleContactClick: (index: number | null, contact: IContact | null) => void;
}

export const Chat = ({ socket, currentUser, handleContactClick }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, handleSendMsg } = useMessages({
    socket,
    scrollRef,
    currentUser,
  });

  return (
    <div className="grid grid-rows-chat overflow-hidden">
      <div className="flex justify-between items-center px-8 bg-zinc-900 border-b border-b-zinc-700">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-800 p-3 rounded-full">
            <FaRegUser color="#a1a1aa" size={15} />
          </div>
          <h2 className="text-lg">{currentUser.username}</h2>
        </div>
        <IoClose
          size={25}
          className="cursor-pointer"
          onClick={() => handleContactClick(null, null)}
        />
      </div>
      <Messages messages={messages} />
      <Input handleSendMsg={handleSendMsg} />
    </div>
  );
};
