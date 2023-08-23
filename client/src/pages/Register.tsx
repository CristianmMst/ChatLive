import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { ButtonGoogle } from "@/components";
import { schemaRegister } from "@/utils/schemas";
import { useRegister } from "@/hooks/useRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  username: string;
}

export const Register = () => {
  const { mutate: Register, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const onSubmit = async (user: FormData) => {
    Register(user);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-zinc-700 p-12 pb-5 rounded flex justify-between flex-col w-full max-w-sm h-[30rem] relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-2xl">Crea un cuenta</h1>
        <input
          type="text"
          className="p-3 rounded"
          {...register("username")}
          placeholder="Nombre de usuario"
        />
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
          {errors.username?.message ||
            errors.email?.message ||
            errors.password?.message ||
            (error instanceof AxiosError && error.response?.data)}
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
