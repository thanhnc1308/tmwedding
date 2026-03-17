export { auth as middleware } from '@/auth';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp3|mp4|woff2?|ttf|eot)$).*)'],
};

// Force middleware to use Node.js runtime instead of Edge
// TODO: move auth db checking to Edge compatible solution
// and remove this line
export const runtime = 'nodejs';
