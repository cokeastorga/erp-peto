"use client";

import { useState } from "react";
import { Search, PackagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInventoryStore } from "@/features/inventory/store";
import { useCartStore } from "../cart-store";

export function ProductSelector() {
  const { products } = useInventoryStore();
  const { addItem } = useCartStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtramos productos por nombre o SKU
  const filteredProducts = products.filter(
    (p) =>
      p.status === "active" && // Solo mostramos activos
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Barra de Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar por nombre o SKU..."
          className="pl-9 bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grilla de Productos */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto pr-2 pb-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-10">
            <PackagePlus className="h-10 w-10 mb-2 opacity-20" />
            <p className="text-sm">No se encontraron productos</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group overflow-hidden border-slate-200"
              onClick={() => addItem(product)}
            >
              <CardContent className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[10px] px-1 h-5 bg-slate-100 text-slate-600">
                    {product.sku}
                  </Badge>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${product.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm leading-tight text-slate-900 line-clamp-2 group-hover:text-blue-600">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{product.category}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-lg text-slate-900">
                    ${product.price.toLocaleString("es-CL")}
                  </span>
                  <Button size="icon" variant="secondary" className="h-6 w-6 rounded-full bg-blue-50 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    +
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}