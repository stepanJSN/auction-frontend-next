import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "./services/authService";
import { ROUTES } from "./config/routesConfig";
import { ISingInResponse } from "./interfaces/auth.interfaces";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  export interface User {
    id?: string;
    data: ISingInResponse;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      data: ISingInResponse;
    };
  }
}

const publicRoutes = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Sign in",
      authorize: async (credentials) => {
        const res = await authService.signIn({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (res.data) {
          return { id: res.data.id, data: res.data };
        }
        throw new Error("Invalid credentials.");
      },
    }),
  ],
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      if (isPublicRoute || isLoggedIn) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (token.user) {
        if (new Date(token.user.data.accessToken.exp).getTime() < Date.now()) {
          try {
            const newToken = await authService.getNewTokens(
              token.user.data.refreshToken.token,
            );
            token.user.data.accessToken = newToken.accessToken;
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
