import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ── Routes that require website login ────────────────────────────
const PROTECTED_WEBSITE_ROUTES = ['/cart', '/checkout', '/orders', '/profile']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Get tokens ───────────────────────────────────────────────
  const token = request.cookies.get('apex-auth')?.value

  // Parse website auth from Zustand persisted cookie
  let isWebsiteAuthenticated = false
  const websiteAuth = request.cookies.get('apex-auth')?.value
  if (websiteAuth) {
    try {
      const parsed = JSON.parse(websiteAuth)
      isWebsiteAuthenticated = parsed?.state?.isAuthenticated === true
    } catch {
      isWebsiteAuthenticated = false
    }
  }

  // ── Dashboard protection ──────────────────────────────────────
  if (pathname === '/dashboard/login') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
  }

  // ── POS protection ────────────────────────────────────────────
  if (pathname === '/pos') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/pos')) {
    if (!token) {
      return NextResponse.redirect(new URL('/pos/login', request.url))
    }
  }

  // ── Website protected routes ──────────────────────────────────
  const isProtectedWebsiteRoute = PROTECTED_WEBSITE_ROUTES.some((route) =>
    pathname.startsWith(route),
  )

  if (isProtectedWebsiteRoute && !isWebsiteAuthenticated) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // ── Auth pages — redirect if already logged in ────────────────
  if (pathname === '/login' || pathname === '/register') {
    if (isWebsiteAuthenticated) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Dashboard
    '/dashboard/:path*',

    // POS
    '/pos/:path*',

    // Website protected
    '/cart',
    '/cart/:path*',
    '/checkout',
    '/checkout/:path*',
    '/orders',
    '/orders/:path*',
    '/profile',
    '/profile/:path*',

    // Auth pages
    '/login',
    '/register',
  ],
}
