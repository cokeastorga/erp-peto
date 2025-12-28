import { ProductSelector } from "@/features/sales/components/ProductSelector";
import { CartSummary } from "@/features/sales/components/CartSummary";

export default function SalesPage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col md:flex-row gap-4 p-2">
      {/* Columna Izquierda: Catálogo (65% ancho) */}
      <div className="flex-1 min-h-0">
        <div className="h-full flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h1 className="text-2xl font-bold text-slate-900">Punto de Venta</h1>
            <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm border">
               {new Date().toLocaleDateString("es-CL", { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-4 overflow-hidden">
             <ProductSelector />
          </div>
        </div>
      </div>

      {/* Columna Derecha: Ticket (35% ancho) */}
      <div className="w-full md:w-[400px] xl:w-[450px] min-h-0">
        <CartSummary />
      </div>
    </div>
  );
}