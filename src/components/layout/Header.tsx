import { Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
      {/* Lado Izquierdo: Título o Breadcrumbs (podemos hacerlo dinámico luego) */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Panel de Control</h2>
      </div>

      {/* Lado Derecho: Acciones y Perfil */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5" />
          {/* Indicador de notificación */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Admin General</p>
            <p className="text-xs text-gray-500">admin@peto.cl</p>
          </div>
          <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}