import { logout } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { BiLogOutCircle } from "react-icons/bi";

export const LogOut = () => {
  const { id } = useUserStore((state) => state);
  const { removeToken } = useAuthStore((state) => state);

  const handleLogOut = () => {
    removeToken();
    logout(id!);
  };

  return (
    <button
      type="button"
      className="flex justify-center items-center bg-zinc-400 p-1 rounded-full absolute top-[15px] right-3"
      aria-label="logOut"
      onClick={handleLogOut}
    >
      <BiLogOutCircle size={25} color={"black"} />
    </button>
  );
};
