import { Logo, Menu } from "..";
import { IContact } from "@/types/user";
import { Contact } from "./Contact/Contact";

interface Props {
  contacts?: IContact[];
  changeChat: (contact: IContact) => void;
}

export const Contacts = ({ contacts, changeChat }: Props) => {
  return (
    <div className="grid grid-rows-contacts bg-zinc-900 border-r border-r-zinc-700">
      <div className="flex items-center justify-around border-b border-b-zinc-700">
        <Logo />
        <Menu />
      </div>
      <div className="flex flex-col overflow-auto gap-y-4 w-full p-4">
        {contacts?.map((contact, index) => (
          <Contact
            key={index}
            index={index}
            contact={contact}
            changeChat={changeChat}
          />
        ))}
      </div>
    </div>
  );
};
