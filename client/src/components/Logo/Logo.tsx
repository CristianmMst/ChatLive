import { RiChat3Line } from "react-icons/ri";

export const Logo = () => {
  return (
    <div className="flex items-center justify-around text-white uppercase font-bold text-xl tracking-widest py-4">
      <div className="flex items-center gap-x-2">
        <RiChat3Line className="text-2xl" />
        <p>Chat App</p>
      </div>
    </div>
  );
};
