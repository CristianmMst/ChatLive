import { RiChat3Line } from "react-icons/ri";

export const Logo = () => {
  return (
    <div className="flex items-center justify-around w-full text-white uppercase font-bold text-xl tracking-widest py-4 border-b-zinc-700 border-b">
      <div className="flex items-center gap-x-2">
        <RiChat3Line className="text-2xl" />
        <p>Chat App</p>
      </div>
    </div>
  );
};
