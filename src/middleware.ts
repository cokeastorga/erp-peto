import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Si el usuario no está logueado, se redirige aquí automáticamente
  pages: {
    signIn: "/login",
  },
});

// Definimos qué rutas queremos proteger
export const config = {
  // Protegemos todo lo que esté en /dashboard y sus subcarpetas
  // matcher: ["/dashboard/:path*", "/inventory/:path*", "/logistics/:path*"]
  // O más fácil: protegemos todo EXCEPTO login, api y estáticos
  matcher: [
    "/dashboard/:path*", 
    "/inventory/:path*",
    "/logistics/:path*",
    "/crm/:path*"
  ]
};