import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "./types";

interface InventoryState {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updatedData: Partial<Product>) => void; // <--- Nuevo
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      products: [
        { id: "1", sku: "PET-001", name: "Alimento Perro Premium 15kg", stock: 50, price: 45990, status: "active", category: "Alimentos" },
      ],
      
      addProduct: (newProduct) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...newProduct, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      // <--- Implementación del Update
      updateProduct: (id, updatedData) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedData } : product
          ),
        })),
    }),
    {
      name: "erp-peto-inventory",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);