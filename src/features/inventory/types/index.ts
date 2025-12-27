export type ProductStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStockThreshold: number; // Nivel mínimo antes de alertar
  status: ProductStatus;
  lastUpdated: string;
}

// Utilidad para calcular el estado automáticamente según el stock
export const getProductStatus = (stock: number, threshold: number): ProductStatus => {
  if (stock === 0) return 'OUT_OF_STOCK';
  if (stock <= threshold) return 'LOW_STOCK';
  return 'IN_STOCK';
};