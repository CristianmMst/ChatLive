import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico requerido"),
  password: yup
    .string()
    .required("Contraseña requerida")
    .min(4, "Minimo 4 caracteres"),
});
