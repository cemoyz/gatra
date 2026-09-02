import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protect all /dashboard routes and /admin shortcut
  if (pathname.startsWith('/dashboard') || pathname === '/admin') {
    const token = request.cookies.get('hoom_auth_token')?.value
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin']
}
