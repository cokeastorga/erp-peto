export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Resumen Operativo</h1>
      
      {/* Grid de Widgets de Ejemplo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Pedidos Hoy</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,240</p>
          <span className="text-green-600 text-sm font-medium">+12% vs ayer</span>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Alertas de Stock</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">23</p>
          <span className="text-gray-500 text-sm">Productos críticos</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Tickets Abiertos</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
          <span className="text-gray-500 text-sm">Tiempo prom: 2h</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
        Área para gráfico de ventas (Próximamente)
      </div>
    </div>
  );
}