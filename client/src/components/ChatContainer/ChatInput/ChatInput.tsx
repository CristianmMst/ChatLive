import { FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";

interface Props {
  handleSendMsg: (msg: string) => void;
}

export const ChatInput = ({ handleSendMsg }: Props) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-zinc-900 border-t border-t-zinc-700 p-5">
      <form
        className="flex justify-around items-center bg-zinc-950 rounded-md w-full h-full border border-zinc-700"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent w-[80%] h-full placeholder:text-white outline-none p-2"
        />
        <button type="submit" className="p-2">
          <IoMdSend size={25} color="white" />
        </button>
      </form>
    </div>
  );
};
