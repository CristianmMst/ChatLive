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
    <div className="flex justify-center items-center w-full">
      <form
        className="flex justify-between items-center bg-zinc-500 rounded-md w-[90%]"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          value={message}
          className="bg-transparent w-[90%] placeholder:text-white outline-none p-2"
          placeholder="Mensaje"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-zinc-400 rounded-r-md p-2">
          <IoMdSend size={25} color="black" />
        </button>
      </form>
    </div>
  );
};
