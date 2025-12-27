    import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirección inmediata al entrar a la raíz
  redirect('/dashboard');
}