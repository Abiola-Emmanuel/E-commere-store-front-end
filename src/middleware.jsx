import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET, // Explicitly pass the secret
    secureCookie: process.env.NODE_ENV === "production", // true for Vercel
  });

  const { pathname } = req.nextUrl;

  // Protected routes
  const protectedRoutes = ["/cart", "/checkout", "/products"];
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Match all relevant paths
export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/products/:path*"],
};