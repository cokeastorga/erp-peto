import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
    // Mantener los datos frescos por 1 minuto
    staleTime: 1000 * 60,
  });
};