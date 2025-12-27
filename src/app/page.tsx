import { redirect } from "next/navigation";

export default function Home() {
  // Redirigimos inmediatamente al dashboard.
  // El middleware se encargará de pedir login si no hay sesión.
  redirect("/dashboard");
}