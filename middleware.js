import { NextResponse } from 'next/server';

// Simple middleware for admin routes protection
export function middleware(request) {
  // Protect admin routes except login
  if (request.nextUrl.pathname.startsWith('/joynobiadmin') && 
      !request.nextUrl.pathname.includes('/login')) {
    
    // Check for admin session
    const session = request.cookies.get('adminSession');
    if (!session || session.value !== 'true') {
      return NextResponse.redirect(new URL('/joynobiadmin/login', request.url));
    }
  }
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/joynobiadmin/:path*']
}; 