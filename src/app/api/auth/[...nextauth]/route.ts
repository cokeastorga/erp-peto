import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // AQUÍ CONECTAREMOS CON TU BASE DE DATOS MÁS ADELANTE
        // Por ahora, simulamos un usuario Admin ("Hardcoded")
        
        const user = { 
            id: "1", 
            name: "Admin General", 
            email: "admin@peto.cl", 
            role: "ADMIN" 
        };

        // Validación simple para probar el flujo
        if (credentials?.email === "admin@peto.cl" && credentials?.password === "123456") {
          return user;
        } else {
          return null; // Login fallido
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Le decimos a NextAuth que usaremos nuestra propia page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Pasamos el rol al token
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos el rol a la sesión visible en el frontend
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };