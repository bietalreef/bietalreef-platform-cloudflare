import { NextResponse } from 'next/server';

const ARKLEEN_PRODUCT_ROUTE = /^\/(?:en\/)?products\/arkleen\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/i;

// The temporary Cloudflare workers.dev host is a NON-INDEXABLE preview.
// The original production Vercel routes must not acquire this header.
function isCloudflareStaging(request) {
  return request.nextUrl.hostname.endsWith('.workers.dev');
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const match = pathname.match(ARKLEEN_PRODUCT_ROUTE);
  const response = match
    ? NextResponse.redirect(
        new URL(`https://app.bietalreef.ae/product/${match[1].toLowerCase()}`),
        301
      )
    : NextResponse.next();

  if (isCloudflareStaging(request)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    response.headers.set('Cache-Control', 'no-store');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
