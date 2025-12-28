import { create } from "zustand";
import { Product } from "@/features/inventory/types";
import { Customer } from "@/features/customers/types";
import { CartItem } from "./types";

interface CartState {
  items: CartItem[];
  selectedCustomer: Customer | null;
  
  // Acciones
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomer: (customer: Customer | null) => void;
  clearCart: () => void;
  
  // Getters (Computados)
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  selectedCustomer: null,

  addItem: (product) => {
    const { items } = get();
    const existingItem = items.find((i) => i.id === product.id);

    if (existingItem) {
      // Si ya existe, aumentamos la cantidad (si hay stock)
      if (existingItem.quantity < product.stock) {
        set({
          items: items.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.price }
              : i
          ),
        });
      }
    } else {
      // Si es nuevo, lo agregamos con cantidad 1
      set({
        items: [
          ...items,
          { ...product, quantity: 1, subtotal: product.price },
        ],
      });
    }
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => {
        if (i.id === id) {
           // Validar que no exceda el stock real
           const validQuantity = Math.min(Math.max(1, quantity), i.stock);
           return { 
             ...i, 
             quantity: validQuantity, 
             subtotal: validQuantity * i.price 
           };
        }
        return i;
      }),
    })),

  setCustomer: (customer) => set({ selectedCustomer: customer }),
  
  clearCart: () => set({ items: [], selectedCustomer: null }),

  total: () => get().items.reduce((acc, item) => acc + item.subtotal, 0),
}));