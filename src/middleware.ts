import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    const userRole = token.role as string

    // 1. Admin Shield
    if (path.startsWith("/admin")) {
      const allowedRoles = ["Super Admin", "Branch Admin", "Content Manager"]
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    // 2. Student Shield
    if (path.startsWith("/student")) {
      if (userRole !== "Student" && userRole !== "Super Admin") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    // 3. Parent Shield
    if (path.startsWith("/parent")) {
      if (userRole !== "Parent" && userRole !== "Super Admin") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/parent/:path*"],
}
