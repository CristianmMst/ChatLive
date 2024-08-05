import { useRef } from "react";
import { IContact } from "@/types/user";
import { Socket } from "socket.io-client";
import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { formatTime } from "@/utils/formatTime";
import { ChatInput } from "./ChatInput/ChatInput";
import { useMessages } from "@/hooks/useMessages";

interface Props {
  socket: Socket;
  currentUser: IContact;
  // handleChatChange: (chat: IContact | null) => void;
  handleContactClick: (index: number | null, contact: IContact | null) => void;
}

export const ChatContainer = ({
  socket,
  currentUser,
  handleContactClick,
}: Props) => {
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
      <div className="flex flex-col py-5 pr-3 pl-5 mr-2 gap-3 overflow-auto bg-zinc-950">
        {messages?.map((message, index) => (
          <div key={index} ref={scrollRef}>
            <div
              className={`flex items-center ${
                message.fromSelf ? "justify-end" : ""
              }`}
            >
              <div
                className={`flex relative max-w-[40%] break-text ${
                  message.fromSelf
                    ? "bg-purple-600 rounded-tr-xl rounded-l-md pr-10"
                    : "bg-zinc-600 rounded-tl-xl rounded-r-md pr-10"
                }`}
              >
                <p className="px-4 py-1">{message.message}</p>
                <span
                  className={`absolute text-[0.6rem] ${message.fromSelf ? "right-2 bottom-1" : "right-2 bottom-1"}`}
                >
                  {formatTime(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};
