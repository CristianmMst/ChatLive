import { RefObject } from "react";
import { formatTime } from "@/modules/shared/utils";

interface Message {
  text: string;
  image: string;
  fromSelf: boolean;
  createdAt: Date;
}

interface Props {
  messages: Message[] | undefined;
  scrollRef: RefObject<HTMLDivElement>;
}

export const Messages = ({ messages, scrollRef }: Props) => {
  return (
    <div className="flex flex-col py-5 pr-3 pl-5 mr-2 gap-3 overflow-auto bg-zinc-950">
      {messages?.map((message, index) => (
        <div key={index} ref={scrollRef}>
          <div
            className={`flex items-center ${
              message.fromSelf ? "justify-end" : ""
            }`}
          >
            <div
              className={`flex flex-col justify-center relative max-w-[40%] break-text min-w-[6.5rem] ${
                message.fromSelf
                  ? "bg-purple-600 rounded-tr-xl rounded-l-md"
                  : "bg-zinc-600 rounded-tl-xl rounded-r-md"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  className={`w-full p-1 rounded-xl ${message.text && "pb-0"}`}
                />
              )}
              <div className="flex items-start justify-between">
                {message.text && (
                  <p className="px-4 py-1 self-start">{message.text}</p>
                )}
                <span
                  className={`text-[0.6rem] self-end pr-2 pb-1 ${message.image && !message.text && "absolute right-1 bottom-1"}`}
                >
                  {formatTime(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
