// src/features/inventory/schema.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "El nombre es muy corto"),
  sku: z.string().min(3, "SKU requerido"),
  category: z.string().min(1, "Categoría requerida"),
  // coerce convierte el string del input a number
  price: z.coerce.number().min(1, "El precio debe ser mayor a 0"), 
  stock: z.coerce.number().min(0, "El stock no puede ser negativo"),
  status: z.enum(["active", "draft", "low_stock"]),
});

export type ProductFormValues = z.infer<typeof productSchema>;