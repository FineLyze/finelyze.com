import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const role = sessionClaims?.metadata?.role;
  if (role !== 'admin') {
    redirect('/unauthorized');
  }

  return { userId, role };
}
