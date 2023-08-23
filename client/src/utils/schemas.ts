import * as yup from "yup";

export const schemaRegister = yup.object().shape({
  email: yup
    .string()
    .email("Correo electrónico inválid")
    .required("Correo electrónico requerido"),
  username: yup
    .string()
    .required("Nombre de usuario requerido")
    .max(40, "Nombre de usuario maximo 40 caracteres"),
  password: yup
    .string()
    .required("Contraseña requerida")
    .min(4, "Minimo 4 caracteres"),
});

export const schemaLogin = yup.object({
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico requerido"),
  password: yup
    .string()
    .required("Contraseña requerida")
    .min(4, "Minimo 4 caracteres"),
});
