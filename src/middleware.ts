import { NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';
import { auth } from '@/auth';

function getPathnameLocale(pathname: string): string | null {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}

// Auth middleware runs first (via NextAuth wrapper), then we handle locale rewriting
export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const pathnameLocale = getPathnameLocale(pathname);

  if (!pathnameLocale) {
    // No locale prefix — rewrite to default locale (URL stays clean)
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp3|mp4|woff2?|ttf|eot|PNG|JPG|JPEG|GIF|SVG|ICO|WEBP|MP3|MP4|WOFF2?|TTF|EOT)$).*)',
  ],
};

// Force middleware to use Node.js runtime instead of Edge
// TODO: move auth db checking to Edge compatible solution
// and remove this line
export const runtime = 'nodejs';
