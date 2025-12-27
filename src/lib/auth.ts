import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock de usuario para desarrollo
        if (
          credentials?.email === "admin@peto.cl" &&
          credentials?.password === "123456"
        ) {
          return { id: "1", name: "Admin Peto", email: "admin@peto.cl", role: "admin" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirige aquí si no está autenticado
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secreto_super_seguro_para_dev", // En prod va en .env
};