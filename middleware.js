import { NextResponse } from 'next/server';

// Simple middleware for admin routes protection
export function middleware(request) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/joynobiadmin')) {
    // Skip the login page itself
    if (request.nextUrl.pathname === '/joynobiadmin/login') {
      return NextResponse.next();
    }

    // Check for admin session
    const adminSession = request.cookies.get('adminSession');
    
    if (!adminSession) {
      // Redirect to login if no session exists
      return NextResponse.redirect(new URL('/joynobiadmin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/joynobiadmin/:path*'
  ]
}; 