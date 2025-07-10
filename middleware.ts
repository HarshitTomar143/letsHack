import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/home', '/profile']; // Add more as needed

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Only protect specified routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signinUrl = new URL('/signin', request.url);
      return NextResponse.redirect(signinUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/profile'], // Add more as needed
}; 