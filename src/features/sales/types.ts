import { Product } from "@/features/inventory/types";
import { Customer } from "@/features/customers/types";

// Un item dentro del carrito de compras
export interface CartItem extends Product {
  quantity: number; // Cantidad a vender
  subtotal: number; // precio * cantidad
}

// El registro histórico de una venta
export interface Sale {
  id: string;
  date: string;       // Fecha ISO
  customer: Customer | null; // Cliente (puede ser anónimo/null)
  items: CartItem[];  // Qué compró
  total: number;      // Total pagado
  status: "completed" | "refunded";
}