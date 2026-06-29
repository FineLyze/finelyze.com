import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)']);

// When Clerk keys aren't configured yet, protect admin routes minimally and
// let the marketing site serve normally — avoids MIDDLEWARE_INVOCATION_FAILED.
function fallbackMiddleware(req: NextRequest) {
  if (isAdminRoute(req)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  return NextResponse.next();
}

const clerkReady = !!(
  process.env.CLERK_SECRET_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);

export default clerkReady
  ? clerkMiddleware(async (auth, req) => {
      if (isAdminRoute(req)) {
        await auth.protect();
        const { sessionClaims } = await auth();
        const role = sessionClaims?.metadata?.role;
        if (role !== 'admin') {
          return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
      }
    })
  : fallbackMiddleware;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
