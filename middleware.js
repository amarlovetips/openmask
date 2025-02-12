import { NextResponse } from 'next/server';

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/joynobiadmin')) {
    const token = request.cookies.get('adminToken');
    
    if (!token) {
      return NextResponse.redirect(new URL('/joynobiadmin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/joynobiadmin/:path*',
}; 