import { useUserStore } from "../store/user";
import IlustrationChat from "@/assets/IlustrationChat.svg";

export const Welcome = () => {
  const { username } = useUserStore((state) => state);
  return (
    <div className="flex justify-center items-center flex-col gap-4 rounded-tr-lg rounded-br-l animate-in max-sm:hidden">
      <img className="w-60" src={IlustrationChat} alt="IlustrationChat" />
      <div>
        <h1 className="font-bold text-xl text-center">
          ¡Bienvenido/a, <span className="text-purple-500">{username}</span>!
        </h1>
        <p>Selecciona un chat para empezar a enviar mensajes</p>
      </div>
    </div>
  );
};
