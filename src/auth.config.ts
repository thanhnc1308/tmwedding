import type { NextAuthConfig, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { UserRole } from './types/auth';
import { getUserRoleFromEmail } from './utils/auth';

const isAdminRoutes = (path: string) => path.startsWith('/admin');
const isAdmin = (user?: User) =>
  getUserRoleFromEmail(user?.email) === UserRole.Admin;
const shouldRedirectToDefault = (path: string) =>
  path.startsWith('/login') || path.startsWith('/signup');

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user;
      const path = nextUrl.pathname;

      if (isAdminRoutes(path) && !isAdmin(user)) {
        return Response.redirect(new URL('/404', nextUrl));
      }

      if (shouldRedirectToDefault(path) && isLoggedIn) {
        if (isAdmin(user)) {
          return Response.redirect(new URL('/admin/guest-list', nextUrl));
        }

        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      // Dynamic import to avoid loading mongoose in Edge runtime
      const { saveOAuthUser } = await import('./actions/auth.action');
      await saveOAuthUser(user, account, profile);
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
