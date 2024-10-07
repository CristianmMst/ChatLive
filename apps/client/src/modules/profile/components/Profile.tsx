import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useUserStore } from "@/modules/shared/store/user";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export const Profile = () => {
  const { username, email, avatar } = useUserStore((state) => state);
  const {
    image,
    update,
    newAvatar,
    newUsername,
    setNewUsername,
    handleChangeAvatar,
  } = useUpdateProfile();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (newUsername.value !== username && newUsername.value) {
      formData.append("username", newUsername.value);
    }
    image && formData.append("avatar", image);

    if (newUsername.value !== username || newAvatar !== avatar)
      update(formData);
  };

  return (
    <div className="grid place-content-center min-h-screen bg-zinc-900">
      <div className="border border-zinc-700 rounded min-w-[25rem]">
        <div className="flex items-center gap-x-4 bg-zinc-800 p-4 rounded-t">
          <div className="relative rounded-full cursor-pointer">
            {newAvatar ? (
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={newAvatar}
                alt="avatar"
              />
            ) : (
              <FaUserCircle size={95} className="text-zinc-900" />
            )}
            <label
              htmlFor="avatar"
              className="bg-zinc-950 rounded-full bg-opacity-60 backdrop-blur-[1px] w-full h-full absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <FaPencil
                size={20}
                className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={handleChangeAvatar}
              />
            </label>
          </div>
          <div>
            <p className="font-bold text-2xl">{username}</p>
            <p className="text-sm text-zinc-400">{email}</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 gap-y-4 bg-zinc-900 rounded-b"
        >
          <div className="flex flex-col gap-x-4">
            <label className="font-bold">Nombre de usuario</label>
            <div className="flex justify-between items-center">
              {newUsername.modify ? (
                <input
                  type="text"
                  value={newUsername.value}
                  placeholder="Nombre"
                  className="rounded p-1 mt-1 outline-none"
                  onChange={(e) =>
                    setNewUsername({ ...newUsername, value: e.target.value })
                  }
                />
              ) : (
                <p>{newUsername.value}</p>
              )}
              <button
                type="button"
                className={`rounded p-1 px-2 font-bold ${newUsername.modify ? "bg-zinc-100 text-zinc-900" : "bg-zinc-950"}`}
                onClick={() =>
                  setNewUsername({
                    ...newUsername,
                    modify: !newUsername.modify,
                  })
                }
              >
                {newUsername.modify ? "Aceptar" : "Modificar "}
              </button>
            </div>
          </div>
          <div>
            <label className="font-bold">Correo Electrónico</label>
            <div className="flex justify-between items-center">
              <p className="text-zinc-400">{email}</p>
            </div>
          </div>
          <div className="flex justify-end gap-x-4 pt-10">
            <Link to={"/"} className="bg-zinc-950 rounded p-1 px-2  font-bold">
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-zinc-100 rounded p-1 px-2 text-zinc-900 font-bold"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
