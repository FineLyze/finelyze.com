import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)']);

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
        // Redirects to /sign-in if not authenticated
        const { userId } = await auth.protect();

        // Fetch live user so we don't rely on publicMetadata being in the JWT
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const role = (user.publicMetadata as { role?: string })?.role;

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
