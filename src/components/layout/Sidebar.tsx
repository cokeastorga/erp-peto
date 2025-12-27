'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Usamos la utilidad que creamos antes
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Inventario',
    href: '/inventory',
    icon: Package,
  },
  {
    title: 'Logística & Envíos',
    href: '/logistics',
    icon: Truck,
  },
  {
    title: 'Clientes (CRM)',
    href: '/crm',
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64 border-r border-slate-800">
      {/* Logo de la Empresa */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-blue-500">
          ERP<span className="text-white">Peto</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Gestión Empresarial v1.0</p>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer del Sidebar (Config y Logout) */}
      <div className="p-4 border-t border-slate-800 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          Configuración
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}