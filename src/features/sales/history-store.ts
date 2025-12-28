import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Sale } from "./types";

interface SalesHistoryState {
  sales: Sale[];
  addSale: (sale: Sale) => void;
}

export const useSalesHistoryStore = create<SalesHistoryState>()(
  persist(
    (set) => ({
      sales: [],
      addSale: (sale) => set((state) => ({ sales: [sale, ...state.sales] })),
    }),
    {
      name: "erp-peto-sales-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);