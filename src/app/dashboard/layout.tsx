import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Fijo a la izquierda */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 z-50">
        <Sidebar />
      </aside>

      {/* Contenido Principal (desplazado a la derecha) */}
      <main className="flex-1 flex flex-col md:pl-64 h-full transition-all duration-300">
        <Header />
        
        {/* Área de Scroll para el contenido */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}