import { AxiosError } from "axios";
import { useRegister } from "../hooks";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { RegisterData } from "../types/auth";
import { registerSchema } from "../schemas/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonGoogle } from "@/modules/shared/components";

export const Register = () => {
  const { mutate: Register, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (user: RegisterData) => {
    Register(user);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        className="bg-zinc-900 p-12 pb-5 rounded flex justify-between flex-col w-full max-w-sm gap-y-4 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-2xl">Crea un cuenta</h1>
        <input
          type="text"
          {...register("username")}
          placeholder="Nombre de usuario"
          className="p-3 rounded border border-zinc-700"
        />
        <input
          type="email"
          {...register("email")}
          placeholder="Correo electrónico"
          className="p-3 rounded border border-zinc-700"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Contraseña"
          className="p-3 rounded border border-zinc-700"
        />
        <p className="text-red-500 text-center">
          {errors.username?.message ||
            errors.email?.message ||
            errors.password?.message ||
            (error instanceof AxiosError && error.response?.data.message)}
        </p>
        <button className="bg-purple-600 rounded p-3 font-bold" type="submit">
          {!isLoading && "Registrarse"}
          <ClipLoader size={18} color="white" loading={isLoading} />
        </button>
        <ButtonGoogle text="Registrase con Google" />
        <div className="self-center">
          ¿Ya tienes una cuenta?{" "}
          <span className="text-purple-400">
            <Link to="/login">Ingresa.</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
