import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROUTES } from "@/config/routesConfig";

const publicRoutes = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("accessToken")?.value;

  if (!isPublicRoute && !cookie) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
