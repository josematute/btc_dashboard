import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that don't require authentication
const publicRoutes = ["/login", "/signup", "/forgot-password"]

// Routes that require authentication
const protectedRoutes = [
  "/",
  "/address",
  "/block",
  "/blocks",
  "/tx",
]

// Verify JWT token
async function verifyToken(token: string) {
  console.log("[Middleware] Verifying token")
  try {
    // Import jose dynamically, better for edge runtime
    const { jwtVerify } = await import('jose')

    // In a real application, you would verify the JWT against a proper secret
    // For now, we're just checking if it exists and is properly formatted
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || "bitcoin-dashboard-secret")
    )
    return payload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Log request information for debugging
  console.log(`[Middleware] Processing request for: ${path}`)

  // Check if the path is in the public routes
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

  // Log whether this is a public route
  console.log(`[Middleware] Is public route: ${isPublicRoute}`)

  // Allow access to static files and API routes without authentication
  if (path.includes("/_next") || path.includes("/api/")) {
    console.log(`[Middleware] Allowed static/API route: ${path}`)
    return NextResponse.next()
  }

  // Check for the accessToken in cookies
  const accessToken = request.cookies.get("accessToken")?.value

  // Log authentication status
  console.log(`[Middleware] Has accessToken: ${!!accessToken}`)

  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path === route || path.startsWith(route + "/"))
  console.log(`[Middleware] Is protected route: ${isProtectedRoute}`)

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !accessToken) {
    console.log(`[Middleware] Redirecting to login: no token for protected route ${path}`)
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If accessing a public route with a valid token, redirect to dashboard
  if (isPublicRoute && accessToken) {
    try {
      const payload = await verifyToken(accessToken)
      if (payload) {
        console.log(`[Middleware] Redirecting to dashboard: authenticated user on public route ${path}`)
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      // Token verification failed, continue to public route
      console.error(`[Middleware] Token verification failed for ${path}:`, error)
    }
  }

  console.log(`[Middleware] Request proceeding normally for ${path}`)
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|Bitcoin.svg.png).*)"]
} 