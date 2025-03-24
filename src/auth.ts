import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
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
        const res = await authService.signInWithCredentials({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (res.data) {
          return { id: res.data.id, data: res.data };
        }
        throw new Error("Invalid credentials.");
      },
    }),
    Google,
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
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const res = await authService.signInWithGoogle(account.id_token);
        if (!res.data || !profile) {
          return false;
        }
        profile.id = res.data.id;
        profile.accessToken = res.data.accessToken;
        profile.refreshToken = res.data.refreshToken;
        profile.role = res.data.role;
      }
      return true;
    },
    async jwt({ token, user, profile }) {
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
      if (profile) {
        token.user = {
          data: {
            id: profile.id,
            accessToken: profile.accessToken,
            refreshToken: profile.refreshToken,
            role: profile.role,
          },
        };
      } else if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
