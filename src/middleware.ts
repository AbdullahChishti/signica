import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  console.log(`🔍 MIDDLEWARE: Processing ${pathname}`)

  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api') || 
      pathname === '/favicon.ico' ||
      pathname.includes('.')) {
    return NextResponse.next()
  }

  // TEMPORARILY DISABLE PROTECTION FOR TESTING
  console.log(`⚠️  MIDDLEWARE: Protection temporarily disabled for testing`)
  return NextResponse.next()

  // TODO: Re-enable protection once login flow is confirmed working
  /*
  // Public routes - always allow
  const publicRoutes = ['/', '/login', '/signup', '/demo', '/unauthorized']
  if (publicRoutes.includes(pathname)) {
    console.log(`🌐 MIDDLEWARE: Public route ${pathname} - allowing`)
    return NextResponse.next()
  }

  // Protected routes - check for auth
  const protectedRoutes = ['/admin', '/candidate', '/settings']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected) {
    console.log(`🔒 MIDDLEWARE: Protected route ${pathname} - checking auth`)
    
    // Simple cookie check - look for any Supabase auth cookie
    const cookies = request.cookies.getAll()
    console.log(`🍪 MIDDLEWARE: All cookies:`, cookies.map(c => c.name))
    
    const hasAuthCookie = cookies.some(cookie => 
      cookie.name.includes('supabase') || 
      cookie.name.includes('sb-') ||
      cookie.name.includes('access-token') ||
      cookie.name.includes('auth-token') ||
      (cookie.name.startsWith('sb-') && cookie.value.length > 10)
    )

    console.log(`🍪 MIDDLEWARE: Auth cookie found: ${hasAuthCookie}`)

    if (!hasAuthCookie) {
      console.log(`🔄 MIDDLEWARE: No auth cookie, redirecting to login`)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    console.log(`✅ MIDDLEWARE: Auth cookie present, allowing access`)
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
