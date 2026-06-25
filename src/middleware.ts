import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function verifyToken(token: string) {
  const secret = getSecret();
  if (!secret) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

async function handleAdminAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/contact" && request.method === "POST") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin/home", request.url));
    }
  }

  if (pathname.startsWith("/api")) {
    const publicApi =
      (pathname === "/api/contact" && request.method === "POST") ||
      pathname === "/api/auth/login";

    if (!publicApi) {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (!token || !(await verifyToken(token))) {
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return handleAdminAuth(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
