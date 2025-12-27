"use client";

import { useEffect, useState } from "react"; // Agregamos useState para evitar hidratación incorrecta
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  LogOut, 
  ChevronLeft,
  Menu,
  Settings
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUIStore } from "./ui-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  
  // Solución de hidratación: esperamos a que monte para mostrar el estado correcto
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // Lógica automática: Si es inventario, colapsar por defecto al entrar
    if (pathname.includes("/inventory")) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  if (!mounted) return null; // Evita el "flicker" inicial

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/inventory", label: "Inventario", icon: Package },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-slate-950 text-slate-300 transition-all duration-300 ease-in-out flex flex-col shadow-2xl",
        isSidebarOpen ? "w-64" : "w-[70px]"
      )}
    >
      {/* Header: Logo y Toggle */}
      <div className={cn(
        "flex h-14 items-center border-b border-slate-800 transition-all mb-2",
        isSidebarOpen ? "px-4 justify-between" : "justify-center px-0"
      )}>
        {isSidebarOpen && (
          <span className="font-bold text-lg tracking-wider text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent truncate">
            PETO ERP
          </span>
        )}
        
        {/* Botón Toggle: Centrado perfecto cuando está colapsado */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn(
            "text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8",
            !isSidebarOpen && "mx-auto" 
          )}
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      {/* Navegación */}
      <nav className="flex-1 space-y-1 px-2">
        <TooltipProvider delayDuration={0}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg transition-all duration-200 group relative",
                      // Altura fija para consistencia
                      "h-10", 
                      // Condicionales de estado
                      isActive 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
                        : "hover:bg-slate-900 hover:text-white",
                      // Alineación: Si está abierto padding normal, si cerrado centrado absoluto
                      isSidebarOpen ? "px-3 gap-3 justify-start" : "justify-center px-0"
                    )}
                  >
                    <Icon size={20} className="shrink-0" />
                    
                    {/* Texto: Se oculta completamente en modo colapsado */}
                    {isSidebarOpen && (
                        <span className="text-sm font-medium animate-in fade-in duration-300 whitespace-nowrap">
                            {item.label}
                        </span>
                    )}
                  </Link>
                </TooltipTrigger>
                {/* Tooltip solo si está colapsado */}
                {!isSidebarOpen && (
                  <TooltipContent side="right" className="bg-slate-900 text-white border-slate-800 ml-2">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Footer / Logout */}
      <div className="p-2 border-t border-slate-900 mt-auto">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={() => signOut()}
                className={cn(
                  "flex items-center rounded-lg transition-colors text-slate-400 hover:text-red-400 hover:bg-red-950/20 h-10 w-full",
                  // Si cerrado, centramos el icono. Si abierto, alineamos izquierda
                  isSidebarOpen ? "px-3 gap-3 justify-start" : "justify-center px-0"
                )}
              >
                <LogOut size={20} className="shrink-0" />
                {isSidebarOpen && (
                    <span className="text-sm font-medium animate-in fade-in duration-300 whitespace-nowrap">
                        Cerrar Sesión
                    </span>
                )}
              </button>
            </TooltipTrigger>
            {!isSidebarOpen && (
                <TooltipContent side="right" className="bg-red-900 text-white border-red-900 ml-2">
                    Salir
                </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}