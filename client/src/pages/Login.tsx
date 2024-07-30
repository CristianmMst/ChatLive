import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ButtonGoogle } from "@/components";
import { ClipLoader } from "react-spinners";
import { useLogin } from "@/hooks/useLogin";
import { schemaLogin } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const { mutate: Login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = async (user: FormData) => {
    Login(user);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-zinc-700 p-10 pb-5 rounded flex justify-between flex-col w-full max-w-sm h-[26rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-2xl">Ingresa a tu cuenta</h1>
        <input
          type="email"
          className="p-3 rounded"
          {...register("email")}
          placeholder="Correo electrónico"
        />
        <input
          className="p-3 rounded"
          type="password"
          {...register("password")}
          placeholder="Contraseña"
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
