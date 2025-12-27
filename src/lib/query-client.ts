import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Los datos se consideran frescos por 1 minuto
      staleTime: 1000 * 60, 
      // Reintentar 1 vez si falla la petición
      retry: 1,
      // No reenfocar la ventana para recargar datos en desarrollo
      refetchOnWindowFocus: false, 
    },
  },
});