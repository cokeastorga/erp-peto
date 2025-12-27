"use client"; // Convertimos a Client Component para manejar estado de UI

import { useState } from "react";
import { ProductList } from "@/features/inventory/components/ProductList";
import { ProductSheet } from "@/features/inventory/components/ProductSheet";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { Product } from "@/features/inventory/types";

export default function InventoryPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Función para abrir el modal en modo CREAR
  const handleOpenCreate = () => {
    setEditingProduct(null); // Aseguramos que no hay producto seleccionado
    setIsSheetOpen(true);
  };

  // Función para abrir el modal en modo EDITAR (se pasa a la tabla)
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-8 pb-8"> {/* Más espacio vertical */}
      
      {/* Header Estilizado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Inventario
          </h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Administra tu catálogo de productos, ajusta precios y controla el stock en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700">
            <Download className="mr-2 h-4 w-4" /> 
            Exportar CSV
          </Button>
          <Button 
            onClick={handleOpenCreate} 
            className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="mr-2 h-4 w-4" /> 
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Componentes */}
      <ProductList onEdit={handleOpenEdit} />

      <ProductSheet 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
}