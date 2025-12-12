
'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function login(password: string) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (password === process.env.ADMIN_PASSWORD) {
    session.isAdmin = true;
    await session.save();
    return { success: true };
  }

  return { success: false, error: 'Invalid password.' };
}

export async function logout() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();
  redirect('/admin/login');
}
