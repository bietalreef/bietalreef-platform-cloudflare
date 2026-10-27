import { NextResponse } from 'next/server';
import { PROVIDER_PUBLICATION_ENABLED } from './lib/providerPublication';

const ARKLEEN_PRODUCT_ROUTE = /^\/(?:en\/)?products\/arkleen\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/i;

// The temporary Cloudflare workers.dev host is a NON-INDEXABLE preview.
// The original production Vercel routes must not acquire this header.
function isCloudflareStaging(request) {
  return request.nextUrl.hostname.endsWith('.workers.dev');
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const staging = isCloudflareStaging(request);
  const publicPath = pathname.replace(/^\/_next\/data\/[^/]+/, '').replace(/^\/en(?=\/)/, '').replace(/\.json$/, '');
  const privateListing = /^\/(products?|providers)\//.test(publicPath) && !/^\/providers\/(register|specialty)(\/|$)/.test(publicPath);
  // Al Rehab is served only from individually approved platform-channel records.
  // All other provider and product listing gates retain their previous behavior.
  const isolatedRehabPresence = /^\/providers\/alrehab-home-clean(?:\/|$)/.test(publicPath);
  if (!PROVIDER_PUBLICATION_ENABLED && privateListing && !isolatedRehabPresence) {
    return new NextResponse('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' } });
  }
  if (staging && pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain', 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' } });
  }

  // Preview access is read-only. Never write analytics, orders, uploads or contacts
  // to the production Supabase project from a publicly reachable test hostname.
  if (staging && !['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return NextResponse.json(
      { error: 'Staging is read-only' },
      { status: 403, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet', 'Cache-Control': 'no-store' } }
    );
  }
  const match = pathname.match(ARKLEEN_PRODUCT_ROUTE);
  const response = match
    ? NextResponse.redirect(
        new URL(`https://app.bietalreef.ae/product/${match[1].toLowerCase()}`),
        301
      )
    : NextResponse.next();

  if (staging) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    response.headers.set('Cache-Control', 'no-store');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
