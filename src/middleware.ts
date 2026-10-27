import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedPage =
    pathname.startsWith("/boards") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin");

  const hasCookie = request.cookies.has("access_token");

  if (isProtectedPage && !hasCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/boards/:path*", "/profile/:path*", "/admin/:path*"],
};
