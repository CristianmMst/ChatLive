import { logout } from "@/services/auth";
import { useUserStore } from "@/store/user";
import { BiLogOutCircle } from "react-icons/bi";

export const LogOut = () => {
  const { id } = useUserStore((state) => state);
  const handleLogOut = () => {
    logout(id);
  };

  return (
    <button
      type="button"
      aria-label="logOut"
      className="flex justify-center items-center bg-zinc-400 p-1 rounded-full absolute top-[15px] right-3"
      onClick={handleLogOut}
    >
      <BiLogOutCircle size={25} color={"black"} />
    </button>
  );
};
