"use client";

import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  PackageSearch,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "../types";
import { useInventoryStore } from "../store";

interface ProductListProps {
  onEdit: (product: Product) => void;
}

export function ProductList({ onEdit }: ProductListProps) {
  const { products, removeProduct } = useInventoryStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm ring-1 ring-slate-900/5">
      <CardHeader className="px-6 py-4 border-b border-slate-100">
        <CardTitle className="text-xl font-bold text-slate-800">
          Listado de Productos
        </CardTitle>
        <CardDescription className="text-slate-500">
          Gestiona el catálogo actual. Tienes {products.length} productos registrados.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px] pl-6 font-semibold text-slate-600">SKU</TableHead>
              <TableHead className="font-semibold text-slate-600">Producto</TableHead>
              <TableHead className="font-semibold text-slate-600">Categoría</TableHead>
              <TableHead className="font-semibold text-slate-600">Estado</TableHead>
              <TableHead className="text-right font-semibold text-slate-600">Stock</TableHead>
              <TableHead className="text-right font-semibold text-slate-600">Precio</TableHead>
              <TableHead className="w-[50px] pr-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-[300px] text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                    <PackageSearch className="h-10 w-10 opacity-20" />
                    <p>No hay productos en el inventario.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="pl-6 font-mono text-xs text-slate-500">
                    {product.sku}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {product.name.substring(0, 2).toUpperCase()}
                      </div>
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{product.category}</TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                  <TableCell className="text-right font-mono text-slate-700">
                    {product.stock} u.
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900">
                    ${product.price.toLocaleString("es-CL")}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <ProductActions 
                      product={product} 
                      onEdit={onEdit} 
                      onDelete={removeProduct} 
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// --- Subcomponentes Visuales ---

function StatusBadge({ status }: { status: Product["status"] }) {
  const styles = {
    active: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    draft: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100",
    low_stock: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  };

  const labels = {
    active: "Activo",
    draft: "Borrador",
    low_stock: "Stock Bajo",
  };

  return (
    <Badge variant="outline" className={`${styles[status]} font-normal px-2.5 py-0.5`}>
      {status === 'low_stock' && <AlertCircle className="w-3 h-3 mr-1" />}
      {labels[status]}
    </Badge>
  );
}

function ProductActions({ 
  product, 
  onEdit, 
  onDelete 
}: { 
  product: Product; 
  onEdit: (p: Product) => void; 
  onDelete: (id: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.sku)}>
          Copiar SKU
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(product)}>
          <Edit className="mr-2 h-4 w-4 text-slate-500" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => {
             if(confirm('¿Eliminar permanentemente?')) onDelete(product.id);
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}