import { NextRequest, NextResponse } from 'next/server'

import { verifyJwt } from '@/lib/jwt'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const isLoginPage =
    req.nextUrl.pathname === '/login'

  if (!token && !isLoginPage) {
    return NextResponse.redirect(
      new URL('/login', req.url)
    )
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(
      new URL('/', req.url)
    )
  }

  if (token) {
    const payload = verifyJwt(token)

    if (!payload) {
      return NextResponse.redirect(
        new URL('/login', req.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/admin/:path*',
    '/requests/:path*',
  ],
}