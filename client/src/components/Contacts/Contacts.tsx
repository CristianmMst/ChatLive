import { Logo, Menu } from "..";
import { IContact } from "@/types/user";
import { FaRegUser } from "react-icons/fa6";

interface Props {
  contacts?: IContact[];
  currentActive: number | null;
  handleContactClick: (index: number, contact: IContact) => void;
}

export const Contacts = ({
  contacts,
  currentActive,
  handleContactClick,
}: Props) => {
  return (
    <div className="grid grid-rows-contacts bg-zinc-900 border-r border-r-zinc-700">
      <div className="flex items-center justify-around border-b border-b-zinc-700">
        <Logo />
        <Menu />
      </div>
      <div className="flex flex-col overflow-auto gap-y-4 w-full p-4">
        {contacts?.map((contact, index) => (
          <div
            className={`flex items-center w-full bg-zinc-600 rounded cursor-pointer gap-3 p-4 ${
              currentActive === index ? "bg-zinc-800" : ""
            } hover:bg-zinc-800 transition duration-500`}
            onClick={() => handleContactClick(index, contact)}
          >
            <div className="bg-zinc-700 p-3 rounded-full">
              <FaRegUser color="#a1a1aa" size={15} />
            </div>
            <h2 className="text-lg">{contact.username}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
