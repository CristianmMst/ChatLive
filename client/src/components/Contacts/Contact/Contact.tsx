import { useState } from "react";
import { IContact } from "@/types/user";
import { BiSolidUserCircle } from "react-icons/bi";

interface Props {
  index: number;
  contact: IContact;
  changeChat: (contact: IContact) => void;
}

export const Contact = ({ contact, changeChat, index }: Props) => {
  const [currentActive, setCurrentActive] = useState<number>();

  const changeCurrentUser = (index: number, contact: IContact) => {
    setCurrentActive(index);
    changeChat(contact);
  };

  return (
    <div
      className={`flex items-center w-full bg-zinc-600 rounded cursor-pointer gap-2 p-1 ${
        index === currentActive ? "bg-zinc-700" : ""
      }`}
      onClick={() => changeCurrentUser(index, contact)}
    >
      <BiSolidUserCircle size={50} color="#cecece" />
      <h2 className="font-bold">{contact.username}</h2>
    </div>
  );
};
