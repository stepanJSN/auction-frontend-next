"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY } from "./constants/globalConstants";

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken);
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
}

export async function clearStorage() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
}
