import { useState } from "react";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../hooks";
import { FaRegUser } from "react-icons/fa";
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
            className={`bg-zinc-800 absolute top-12 right-2 w-40 rounded transition-transform origin-top-right border border-zinc-700 ${open ? "scale-100" : "scale-0"}`}
          >
            <ul>
              <Link to={"/profile"}>
                <li className="flex items-center w-full py-1 px-3 gap-x-2 transition-colors hover:bg-zinc-900 cursor-pointer rounded">
                  <FaRegUser size={18} />
                  <p>Mi perfil</p>
                </li>
              </Link>

              <li
                className="flex items-center w-full py-1 px-3 gap-x-2 transition-colors rounded hover:bg-zinc-900 cursor-pointer border-t border-zinc-700"
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
