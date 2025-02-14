import axios, { type CreateAxiosDefaults } from "axios";
import { SERVER_URL } from "./constants/envConstants";
import { auth } from "./auth";

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(options);
const apiWithAuth = axios.create(options);

apiWithAuth.interceptors.request.use(async (config) => {
  const accessToken = (await auth())?.user?.data.accessToken.token;

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export { api, apiWithAuth };
