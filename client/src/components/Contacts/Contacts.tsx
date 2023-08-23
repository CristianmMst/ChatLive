import { Logo } from "..";
import { IContact } from "@/types/user";
import { Contact } from "./Contact/Contact";

interface Props {
  contacts?: IContact[];
  changeChat: (contact: IContact) => void;
}

export const Contacts = ({ contacts, changeChat }: Props) => {
  return (
    <div className="bg-zinc-500 flex flex-col items-center gap-3 rounded-tl-lg rounded-bl-lg">
      <Logo />
      <div className="flex flex-col overflow-auto gap-2 w-[90%] min-w-[70%]">
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
