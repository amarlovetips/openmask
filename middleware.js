import { NextResponse } from 'next/server';

// Simple middleware for admin routes protection
export function middleware(request) {
  // Only check admin routes
  if (request.nextUrl.pathname.startsWith('/joynobiadmin') && 
      !request.nextUrl.pathname.includes('/login')) {
    
    const session = request.cookies.get('adminSession');
    if (!session) {
      return NextResponse.redirect(new URL('/joynobiadmin/login', request.url));
    }
  }
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/joynobiadmin/:path*']
}; 