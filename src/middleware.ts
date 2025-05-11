import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

/**
 * Authentication middleware that protects routes
 * Wraps the middleware function with NextAuth's withAuth HOC
 * @see https://next-auth.js.org/configuration/nextjs#middleware
 */
export default withAuth(
  function middleware(req) {
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

/**
 * Route matcher configuration for the middleware
 * Specifies which routes should be protected by authentication
 */
export const config = {
  matcher: [
    '/vendors',
    '/vendors/new',
    '/vendors/edit/:path*'
  ]
};