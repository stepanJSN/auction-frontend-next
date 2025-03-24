import type { User, UserObject } from "next-auth";

declare module "next-auth" {
  export interface UserObject {
    id: string;
    role: Role;
  }
  export interface BackendAccessJWT {
    access: string;
  }
  export interface BackendJWT extends BackendAccessJWT {
    refresh: string;
  }
  export interface DecodedJWT extends UserObject {
    token_type: "refresh" | "access";
    exp: number;
    iat: number;
    jti: string;
  }
  export interface AuthValidity {
    valid_until: number;
    refresh_until: number;
  }
  export interface User {
    tokens: BackendJWT;
    user: UserObject;
    validity: AuthValidity;
  }
  export interface Session {
    user: UserObject;
    accessToken: string;
    validity: AuthValidity;
    error: "RefreshTokenExpired" | "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    data: User;
    error: "RefreshTokenExpired" | "RefreshAccessTokenError";
  }
}
