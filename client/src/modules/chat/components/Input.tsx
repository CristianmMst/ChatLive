import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

interface Props {
  handleSendMsg: ({
    text,
    image,
  }: {
    text: string;
    image: File | null;
  }) => void;
}

export const Input = ({ handleSendMsg }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    image: File | null;
  }>({
    text: "",
    image: null,
  });

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      const imagePreview = URL.createObjectURL(image);
      setPreview(imagePreview);
      setMessage({ ...message, image });
    }
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.text.length > 0) {
      handleSendMsg({ text: message.text, image: message.image });
      setPreview("");
      setMessage({ text: "", image: null });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const deleteImage = () => {
    setPreview(null);
    setMessage({ ...message, image: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex justify-center items-center w-full bg-zinc-900 border-t border-t-zinc-700 p-5">
      <form
        className="flex justify-between p-4 items-center bg-zinc-950 rounded-md w-full h-full border border-zinc-700 gap-x-2"
        onSubmit={sendMessage}
      >
        <div className="flex items-center w-full gap-x-2">
          <label
            htmlFor="upload-file"
            className="p-2 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <FiPaperclip size={20} color="white" />
          </label>
          {preview && (
            <div className="relative cursor-pointer" onClick={deleteImage}>
              <img src={preview} className="w-16 rounded-lg" />
              <div className="grid place-content-center bg-zinc-500 w-full inset-0 h-full z-10 absolute rounded-lg opacity-0 hover:opacity-50 transition-opacity">
                <IoClose className="opacity-100 " color="black" size={25} />
              </div>
            </div>
          )}
          <input
            type="file"
            id="upload-file"
            title="Send File"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          <input
            type="text"
            value={message.text}
            placeholder="Type your message..."
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
            className="bg-transparent h-full w-full placeholder:text-zinc-500 outline-none p-2"
          />
        </div>
        <button
          type="submit"
          className="p-2"
          disabled={message.text.length === 0}
        >
          <IoMdSend
            size={25}
            color={message.text.length === 0 ? "grey" : "white"}
          />
        </button>
      </form>
    </div>
  );
};
