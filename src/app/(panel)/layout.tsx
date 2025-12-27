"use client"; // Convertimos a Client para escuchar el store

import { Sidebar } from "@/components/layout/Sidebar";
import { useUIStore } from "@/components/layout/ui-store";
import { cn } from "@/lib/utils";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Sidebar />
      <main 
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out p-6 pt-8",
          isSidebarOpen ? "md:ml-64" : "md:ml-[70px]" // Ajuste dinámico del margen
        )}
      >
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
        </div>
      </main>
    </div>
  );
}