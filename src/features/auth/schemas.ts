import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es obligatorio" })
    .email({ message: "Formato de correo inválido" }),
  password: z
    .string()
    .min(6, { message: "Mínimo 6 caracteres" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;