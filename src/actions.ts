"use server";

import { cookies } from "next/headers";

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken);
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function clearStorage() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
}
