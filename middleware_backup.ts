import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Protected Routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/candidate")
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    try {
      const payload = verifyToken(token) as {
        id: string;
        role: string;
      };

      // Admin Routes
      if (pathname.startsWith("/admin")) {
        if (payload.role !== "admin") {
          return NextResponse.redirect(
            new URL("/candidate/dashboard", request.url)
          );
        }
      }

      // Candidate Routes
      if (pathname.startsWith("/candidate")) {
        if (payload.role !== "candidate") {
          return NextResponse.redirect(
            new URL("/admin", request.url)
          );
        }
      }

      return NextResponse.next();

    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/login", request.url)
      );

      response.cookies.delete("token");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/candidate/:path*",
  ],
};