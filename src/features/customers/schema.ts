import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  rut: z.string().min(8, "RUT inválido"), // Aquí podrías agregar validación real de RUT chileno luego
  email: z.string().email("Correo inválido"),
  phone: z.string().min(8, "Teléfono inválido"),
  address: z.string().min(5, "Dirección muy corta"),
  status: z.enum(["active", "inactive"]),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;