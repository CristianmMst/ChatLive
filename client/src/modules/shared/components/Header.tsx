import { useState } from "react";
import { useOutsideClick } from "../hooks";
import { useUserStore } from "../store/user";
import { RiChat3Line } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { logout } from "@/modules/auth/services/auth";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { id } = useUserStore((state) => state);
  const menuRef = useOutsideClick(() => setOpen(false));

  const handleLogout = async () => {
    await logout(id);
  };

  return (
    <div className="flex items-center justify-around border-b border-b-zinc-700">
      <div className="flex items-center justify-around text-white uppercase font-bold text-xl tracking-widest py-4">
        <div className="flex items-center gap-x-2">
          <RiChat3Line className="text-2xl" />
          <p>Chat App</p>
        </div>
      </div>
      <div className="relative">
        <div
          ref={menuRef}
          onClick={() => setOpen(!open)}
          className={`flex cursor-pointer rounded-full p-2 select-none transition ${open ? "bg-zinc-800" : ""}`}
        >
          <BsThreeDotsVertical size={20} />
          <div
            className={`bg-zinc-800 absolute top-12 right-2 w-40 rounded p-1 transition-transform origin-top-right border border-zinc-700 ${open ? "scale-100" : "scale-0"}`}
          >
            <ul>
              <li
                className="flex justify-around items-center w-full p-1 transition-colors hover:bg-zinc-900 cursor-pointer"
                onClick={handleLogout}
              >
                <PiSignOutBold size={20} />
                <p>Cerrar sesión</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
