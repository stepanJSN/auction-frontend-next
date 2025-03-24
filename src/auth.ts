import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authService } from "./services/authService";
import { ROUTES } from "./config/routesConfig";
import { JWT } from "next-auth/jwt";
import type { AuthValidity, DecodedJWT, User, UserObject } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { ErrorCodesEnum } from "./enums/errorCodes.enum";

const publicRoutes = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
  try {
    const { accessToken } = await authService.getNewTokens(
      nextAuthJWTCookie.data.tokens.refresh,
    );
    const { exp }: DecodedJWT = jwtDecode(accessToken);

    nextAuthJWTCookie.data.validity.valid_until = exp;
    nextAuthJWTCookie.data.tokens.access = accessToken;

    return { ...nextAuthJWTCookie };
  } catch (error) {
    console.debug(error);
    return {
      ...nextAuthJWTCookie,
      error: "RefreshAccessTokenError",
    };
  }
}

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

        if (!res.data) {
          if (res.errorCode === ErrorCodesEnum.Unauthorized) {
            throw new Error("Invalid credentials");
          }
          throw new Error("Server error");
        }

        const accessDecoded: DecodedJWT = jwtDecode(res.data.accessToken);
        const refreshDecoded: DecodedJWT = jwtDecode(res.data.refreshToken);
        const user: UserObject = {
          id: res.data.id,
          role: res.data.role,
        };
        const validity: AuthValidity = {
          valid_until: accessDecoded.exp,
          refresh_until: refreshDecoded.exp,
        };
        return {
          id: refreshDecoded.jti,
          tokens: {
            access: res.data.accessToken,
            refresh: res.data.refreshToken,
          },
          user: user,
          validity: validity,
        } as User;
      },
    }),
    Google,
  ],
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      if (isPublicRoute) {
        return true;
      }
      if (auth && Date.now() < auth?.validity.refresh_until * 1000) {
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
        const accessDecoded: DecodedJWT = jwtDecode(res.data.accessToken);
        const refreshDecoded: DecodedJWT = jwtDecode(res.data.refreshToken);
        profile.data = {
          id: refreshDecoded.jti,
          tokens: {
            access: res.data.accessToken,
            refresh: res.data.refreshToken,
          },
          user: {
            id: res.data.id,
            role: res.data.role,
          },
          validity: {
            valid_until: accessDecoded.exp,
            refresh_until: refreshDecoded.exp,
          },
        };
      }
      return true;
    },
    async jwt({ token, user, profile }) {
      if (profile) {
        return {
          ...token,
          data: profile.data as User,
        };
      } else if (user) {
        return { ...token, data: user };
      }
      if (Date.now() < token.data.validity.valid_until * 1000) {
        return token;
      }

      if (Date.now() < token.data.validity.refresh_until * 1000) {
        return await refreshAccessToken(token);
      }
      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },
    async session({ session, token }) {
      session.user = token.data.user;
      session.accessToken = token.data.tokens.access;
      session.validity = token.data.validity;
      session.error = token.error;
      return session;
    },
  },
});
