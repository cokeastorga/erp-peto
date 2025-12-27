"use client";

import { useEffect, useState } from "react";
import { useInventoryStore } from "@/features/inventory/store";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  DollarSign, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Activity 
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";

// Función auxiliar para formatear dinero (CLP)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
};

export default function DashboardPage() {
  const { products } = useInventoryStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // --- CÁLCULOS DE MÉTRICAS (Lógica de Negocio) ---
  
  // 1. Total de Productos
  const totalProducts = products.length;

  // 2. Valor Total del Inventario (Precio * Stock)
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  // 3. Productos con Stock Bajo
  const lowStockCount = products.filter(p => p.status === 'low_stock' || p.stock < 5).length;

  // 4. Categorías con más stock (Para el gráfico)
  // Agrupamos los productos por categoría y sumamos su stock
  const categoryData = products.reduce((acc: any[], product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += product.stock;
    } else {
      // Si no tiene categoría, lo ponemos como "Sin Cat"
      const catName = product.category || "General";
      acc.push({ name: catName, value: product.stock });
    }
    return acc;
  }, []);

  // Colores para las barras del gráfico (Palette Aesthetic)
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899'];

  return (
    <div className="space-y-6">
      {/* --- ENCABEZADO --- */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500">
          Resumen general de tu negocio y estado del inventario.
        </p>
      </div>

      {/* --- TARJETAS KPI (Key Performance Indicators) --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Valor Monetario */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Valorización Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +20.1% vs mes pasado
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Total Productos */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Items en Catálogo
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalProducts}</div>
            <p className="text-xs text-slate-500 mt-1">
              Productos activos registrados
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Stock Crítico */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Alertas de Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{lowStockCount}</div>
            <p className="text-xs text-slate-500 mt-1">
              Productos requieren reabastecimiento
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Actividad (Mock) */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Movimientos Hoy
            </CardTitle>
            <Activity className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+12</div>
            <p className="text-xs text-slate-500 mt-1">
              Entradas/Salidas registradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- SECCIÓN PRINCIPAL: GRÁFICO Y ALERTAS --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* GRÁFICO DE BARRAS (Ocupa 4 columnas) */}
        <Card className="col-span-4 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Distribución de Stock</CardTitle>
            <CardDescription>Cantidad de unidades por categoría.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`} 
                    />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  No hay datos suficientes para graficar.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* LISTA DE STOCK BAJO (Ocupa 3 columnas) */}
        <Card className="col-span-3 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Atención Requerida</CardTitle>
            <CardDescription>Productos con stock bajo o crítico.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.filter(p => p.status === 'low_stock' || p.stock < 10).length === 0 ? (
                <p className="text-sm text-slate-500">¡Todo en orden! No hay alertas pendientes.</p>
              ) : (
                products
                  .filter(p => p.status === 'low_stock' || p.stock < 10)
                  .slice(0, 5) // Mostrar solo los primeros 5
                  .map((product) => (
                    <div key={product.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.sku}</p>
                      </div>
                      <div className="ml-auto font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">
                        {product.stock} un.
                      </div>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}