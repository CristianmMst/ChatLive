import { useRef } from "react";
import { IContact } from "@/types/user";
import { Socket } from "socket.io-client";
import { ChatInput } from "./ChatInput/ChatInput";
import { useMessages } from "@/hooks/useMessages";
import { BiSolidUserCircle } from "react-icons/bi";

interface Props {
  socket: Socket;
  currentUser: IContact;
}

export const ChatContainer = ({ currentUser, socket }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, handleSendMsg } = useMessages({
    socket,
    scrollRef,
    currentUser,
  });

  return (
    <div className="grid grid-rows-chat overflow-hidden">
      <div className="flex items-center gap-2 p-4">
        <BiSolidUserCircle size={40} color="#cecece" />
        <h2 className="font-bold">{currentUser.username}</h2>
      </div>
      <div className="flex flex-col pt-5 pr-3 pl-5 mr-2 gap-3 overflow-auto">
        {messages?.map((message, index) => (
          <div key={index} ref={scrollRef}>
            <div
              className={`flex items-center ${
                message.fromSelf ? "justify-end" : ""
              }`}
            >
              <div
                className={`flex max-w-[40%] break-words ${
                  message.fromSelf
                    ? "bg-purple-600 rounded-tr-xl rounded-l-md"
                    : "bg-zinc-600 rounded-tl-xl rounded-r-md"
                }`}
              >
                <p className="px-4 py-1">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};
