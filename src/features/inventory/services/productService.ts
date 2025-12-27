import { Product, getProductStatus } from '../types';

// Simulación de base de datos
const MOCK_PRODUCTS: Product[] = Array.from({ length: 50 }).map((_, i) => {
  const stock = Math.floor(Math.random() * 100);
  const threshold = 10;
  return {
    id: `PROD-${i + 1}`,
    sku: `SKU-${1000 + i}`,
    name: `Producto Gimnasio ${i + 1}`,
    category: i % 3 === 0 ? 'Pesas' : i % 3 === 1 ? 'Máquinas' : 'Suplementos',
    price: Math.floor(Math.random() * 50000) + 5000,
    stock,
    minStockThreshold: threshold,
    status: getProductStatus(stock, threshold),
    lastUpdated: new Date().toISOString(),
  };
});

export const productService = {
  getAll: async (): Promise<Product[]> => {
    // Simulamos retardo de red de 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PRODUCTS;
  },
  
  // Aquí agregaremos métodos como create, update, delete después
};