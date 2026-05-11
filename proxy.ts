import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const legacyRoutes: Record<string, string> = {
  "/auth": "/dashboard/users",
  "/users": "/dashboard/users",
  "/events": "/dashboard/events",
  "/reels": "/dashboard/reels-content",
  "/content": "/dashboard/reels-content",
  "/reels-content": "/dashboard/reels-content",
  "/leaderboard": "/dashboard/leaderboard",
  "/diamond": "/dashboard/diamonds",
  "/diamonds": "/dashboard/diamonds",
  "/wallet": "/dashboard/diamonds",
  "/products": "/dashboard/shop",
  "/shop": "/dashboard/shop",
  "/shops": "/dashboard/shop",
  "/support": "/dashboard/support",
  "/settings": "/dashboard/settings",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn =
    request.cookies.get("way_admin_logged_in")?.value === "true";
  const legacyTarget = legacyRoutes[pathname];
  const isDashboardRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const needsLogin = isDashboardRoute || Boolean(legacyTarget);

  if (needsLogin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (legacyTarget && isLoggedIn) {
    return NextResponse.redirect(new URL(legacyTarget, request.url));
  }

  if (pathname === "/" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth",
    "/users",
    "/events",
    "/reels",
    "/content",
    "/reels-content",
    "/leaderboard",
    "/diamond",
    "/diamonds",
    "/wallet",
    "/products",
    "/shop",
    "/shops",
    "/support",
    "/settings",
    "/dashboard/:path*",
  ],
};
