import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for edge runtime
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetTime < now) rateLimitMap.delete(key);
    }
  }

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;

  return "unknown";
}

// Define protected routes
const protectedRoutes: string[] = [];
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIP(request);

  // Rate limiting for API routes
  if (pathname.startsWith("/api")) {
    let limit = 100; // Default: 100 requests per minute
    let windowMs = 60 * 1000;

    // Stricter limits for sensitive endpoints
    if (pathname.includes("/auth") || pathname.includes("/login")) {
      limit = 10; // 10 requests per minute for auth
    } else if (pathname.includes("/payment") || pathname.includes("/stripe") || pathname.includes("/paypal")) {
      limit = 20; // 20 requests per minute for payments
    } else if (pathname.includes("/contact")) {
      limit = 5; // 5 requests per minute for contact
    }

    const allowed = rateLimit(`${ip}:${pathname.split("/")[2] || "api"}`, limit, windowMs);

    if (!allowed) {
      return NextResponse.json(
        {
          error: "Too many requests",
          message: "Please try again later",
          retryAfter: 60
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
          }
        }
      );
    }
  }

  // Block suspicious request patterns
  const userAgent = request.headers.get("user-agent") || "";
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /python-requests\/2\.[0-9]+\.[0-9]+$/i, // Generic Python requests without custom UA
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(userAgent)) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }
  }

  // Block requests with suspicious query parameters
  const url = request.nextUrl.toString();
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /onclick/i,
    /onerror/i,
    /union.*select/i,
    /drop.*table/i,
    /insert.*into/i,
    /delete.*from/i,
    /\.\.\/\.\.\//,  // Path traversal
    /%00/,          // Null byte
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(url)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Get auth token from cookies
  const authToken = request.cookies.get("auth-token")?.value;

  // If route is protected and user is not authenticated
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add security headers to response
  const response = NextResponse.next();

  // Additional security headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
