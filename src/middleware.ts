import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedPage =
    pathname.startsWith("/boards") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin");

  console.log("coodkie", request.cookies);

  const hasCookie = request.cookies.has("access_token");
  console.log("URL:", request.url);
  console.log("Host:", request.nextUrl.host);
  console.log("cookie", hasCookie);

  if (isProtectedPage && !hasCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/boards/:path*", "/profile/:path*", "/admin/:path*"],
};
