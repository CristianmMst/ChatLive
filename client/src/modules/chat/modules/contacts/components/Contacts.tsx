import { FaRegUser } from "react-icons/fa6";
import { IContact } from "../types/contacts";
import { formatTime } from "@/modules/shared/utils";
import { Header } from "@/modules/shared/components";

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
      <Header />
      <div className="flex flex-col overflow-auto gap-y-4 w-full p-4">
        {contacts?.map((contact, index) => (
          <div
            key={index}
            className={`flex items-center w-full bg-zinc-600 rounded cursor-pointer gap-3 p-4 ${
              currentActive === index ? "bg-zinc-800" : ""
            } hover:bg-zinc-800 transition duration-500`}
            onClick={() => handleContactClick(index, contact)}
          >
            <div className="bg-zinc-700 rounded-full w-10 h-10 grid place-items-center">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <FaRegUser color="#a1a1aa" size={15} className="w-full" />
              )}
            </div>
            {contact.lastMessage && (
              <>
                <div className="leading-3 flex-1">
                  <h2 className="text-lg font-bold">{contact.username}</h2>
                  <p className="text-zinc-300">
                    {contact.lastMessage.message.text}
                  </p>
                </div>
                <p className="text-xs">
                  {formatTime(contact.lastMessage.createdAt)}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
