import { useRef } from "react";
import { formatTime } from "@/modules/shared/utils";

interface Message {
  message: string;
  fromSelf: boolean;
  createdAt: Date;
}

interface Props {
  messages: Message[] | undefined;
}

export const Messages = ({ messages }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
              className={`flex relative max-w-[40%] break-text ${
                message.fromSelf
                  ? "bg-purple-600 rounded-tr-xl rounded-l-md pr-10"
                  : "bg-zinc-600 rounded-tl-xl rounded-r-md pr-10"
              }`}
            >
              <p className="px-4 py-1">{message.message}</p>
              <span
                className={`absolute text-[0.6rem] ${
                  message.fromSelf ? "right-2 bottom-1" : "right-2 bottom-1"
                }`}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
