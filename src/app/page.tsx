import { redirect } from 'next/navigation';

export default function Home() {
  // En cuanto alguien entre a la web, lo mandamos al dashboard
  redirect('/dashboard');
}