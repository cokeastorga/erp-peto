'use client';

import { useProducts } from '@/features/inventory/hooks/useProducts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Plus, RefreshCw } from 'lucide-react';
import { ProductStatus } from '@/features/inventory/types';

const StatusBadge = ({ status }: { status: ProductStatus }) => {
  const styles = {
    IN_STOCK: 'bg-green-100 text-green-800 border-green-200',
    LOW_STOCK: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    OUT_OF_STOCK: 'bg-red-100 text-red-800 border-red-200',
  };

  const labels = {
    IN_STOCK: 'En Stock',
    LOW_STOCK: 'Stock Crítico',
    OUT_OF_STOCK: 'Sin Stock',
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {labels[status]}
    </Badge>
  );
};

export default function InventoryPage() {
  const { data: products, isLoading, isError, refetch } = useProducts();

  if (isError) return <div className="p-8 text-red-500">Error cargando inventario.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Inventario Maestro
          </h1>
          <p className="text-sm text-gray-500">Gestión de productos en tiempo real.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={7} className="h-16 text-center text-gray-400 animate-pulse">
                    Cargando datos...
                  </TableCell>
                </TableRow>
              ))
            ) : products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono text-xs text-gray-500">{product.sku}</TableCell>
                <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price)}
                </TableCell>
                <TableCell className="text-center font-semibold">{product.stock}</TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={product.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-blue-600">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}