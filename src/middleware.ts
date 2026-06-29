import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // Layer 1: must be signed in (redirects to /sign-in if not)
    await auth.protect();

    // Layer 2: must have admin role
    const { sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
