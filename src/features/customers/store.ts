import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Customer } from "./types";

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, "id">) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  removeCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: [
        { 
          id: "1", 
          name: "Juan Pérez", 
          email: "juan@gmail.com", 
          phone: "+56912345678", 
          rut: "12.345.678-9", 
          address: "Av. Siempre Viva 123", 
          status: "active",
          lastPurchase: "2023-12-01"
        },
        { 
          id: "2", 
          name: "Empresas Peto SpA", 
          email: "contacto@peto.cl", 
          phone: "+5622334455", 
          rut: "76.543.210-K", 
          address: "Calle Industrial 500", 
          status: "active"
        }
      ],
      
      addCustomer: (data) =>
        set((state) => ({
          customers: [
            ...state.customers,
            { ...data, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),

      updateCustomer: (id, data) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),

      removeCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "erp-peto-customers",
      storage: createJSONStorage(() => localStorage),
    }
  )
);