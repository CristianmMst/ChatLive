import { AxiosError } from "axios";
import { useLogin } from "../hooks";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginData } from "../types/auth";
import { ClipLoader } from "react-spinners";
import { loginSchema } from "../schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonGoogle } from "@/modules/shared/components";

export const Login = () => {
  const { mutate: Login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (user: LoginData) => {
    Login(user);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        className="bg-zinc-900 p-10 pb-5 rounded flex justify-between flex-col w-full max-w-sm gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-2xl">Ingresa a tu cuenta</h1>
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
          {errors.email?.message ||
            errors.password?.message ||
            (error instanceof AxiosError && error.response?.data.message)}
        </p>
        <button className="bg-purple-600 rounded p-3 font-bold" type="submit">
          {!isLoading && "Ingresar"}
          <ClipLoader size={18} color="white" loading={isLoading} />
        </button>
        <ButtonGoogle text="Iniciar sesión con Google" />
        <div className="text-white self-center">
          ¿No tiene una cuenta?{" "}
          <span className="text-purple-400">
            <Link to="/register">Crea una.</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
