import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const publicPaths = ['/', '/login']

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname)

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  if (isLoggedIn && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
