import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is authenticated and trying to access signin page
    if (req.nextUrl.pathname.startsWith('/auth/signin') && req.nextauth.token) {
      return NextResponse.redirect(new URL('/vendors', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/signin'
    }
  }
);

export const config = {
  matcher: [
    '/vendors',
    '/vendors/new',
    '/vendors/edit/:path*',
    '/auth/signin'  // Add signin page to matcher
  ]
};