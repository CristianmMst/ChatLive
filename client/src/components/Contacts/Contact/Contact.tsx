import { IContact } from "@/types/user";
import { FaRegUser } from "react-icons/fa6";

interface Props {
  index: number;
  contact: IContact;
  isActive: boolean;
  handleContactClick: (index: number, contact: IContact) => void;
}

export const Contact = ({
  index,
  contact,
  isActive,
  handleContactClick,
}: Props) => {
  return (
    <div
      className={`flex items-center w-full bg-zinc-600 rounded cursor-pointer gap-3 p-4 ${
        isActive ? "bg-zinc-800" : ""
      } hover:bg-zinc-800 transition duration-500`}
      onClick={() => handleContactClick(index, contact)}
    >
      <div className="bg-zinc-700 p-3 rounded-full">
        <FaRegUser color="#a1a1aa" size={15} />
      </div>
      <h2 className="text-lg">{contact.username}</h2>
    </div>
  );
};
