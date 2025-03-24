import { Role } from "../enums/role.enum";

export interface ISingInRequest {
  email: string;
  password: string;
}

export interface ISingInResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
  role: Role;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}
