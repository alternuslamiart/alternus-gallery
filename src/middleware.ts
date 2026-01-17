import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes (only admin routes are protected)
const protectedRoutes: string[] = [];
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Get auth token from cookies (this is a mock - replace with real auth)
  const authToken = request.cookies.get("auth-token")?.value;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _userRole = request.cookies.get("user-role")?.value;

  // If route is protected and user is not authenticated
  if (isProtectedRoute && !authToken) {
    // Redirect to login with callback URL
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If route is admin-only and user is not admin
  // TEMPORARILY DISABLED FOR DEVELOPMENT - Remove this comment in production
  // if (isAdminRoute && userRole !== "admin") {
  //   // Redirect to home with unauthorized message
  //   const homeUrl = new URL("/", request.url);
  //   return NextResponse.redirect(homeUrl);
  // }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
