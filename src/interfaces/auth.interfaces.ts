import { Role } from "../enums/role.enum";

export interface ISingInRequest {
  email: string;
  password: string;
}

export interface ISingInResponse {
  accessToken: {
    token: string;
    exp: string;
  };
  refreshToken: {
    token: string;
    maxAge: number;
  };
  id: string;
  role: Role;
}

export interface IRefreshTokenResponse {
  accessToken: {
    token: string;
    exp: string;
  };
}
