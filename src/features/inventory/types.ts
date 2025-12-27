export interface Product {
  id: string;
  sku: string;
  name: string;
  stock: number;
  price: number;
  status: 'active' | 'draft' | 'low_stock';
  category: string;
}