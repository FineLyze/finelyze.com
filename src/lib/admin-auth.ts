import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  // publicMetadata is not included in Clerk's default JWT, so we read from the
  // full user object instead of sessionClaims to get the live role value.
  const role = (user.publicMetadata as { role?: string })?.role;
  if (role !== 'admin') redirect('/unauthorized');

  return { userId: user.id, role };
}
