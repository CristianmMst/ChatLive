import { useState } from "react";
import { logout } from "@/services/auth";
import { useUserStore } from "@/store/user";
import { PiSignOutBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import useOutsideClick from "@/hooks/useOutSideClick";

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const { id } = useUserStore((state) => state);
  const menuRef = useOutsideClick(() => setOpen(false));

  const handleLogout = async () => {
    await logout(id);
  };

  return (
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
  );
};
