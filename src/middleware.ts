import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protegemos dashboard, inventory y rutas de api privadas
  matcher: ["/dashboard/:path*", "/inventory/:path*", "/api/protected/:path*"],
};