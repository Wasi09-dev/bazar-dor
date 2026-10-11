import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  console.log("proxy চলছে:", request.nextUrl.pathname);
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackURL", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/profile"],
};