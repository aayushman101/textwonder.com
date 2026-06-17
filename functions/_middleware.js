export async function onRequest(context) {
  const host = context.request.headers.get('host') || '';
  const isPagesDev = host.includes('pages.dev');
  const { pathname } = new URL(context.request.url);

  // Redirect www → non-www with 301
  if (host.startsWith('www.') && !isPagesDev) {
    const url = new URL(context.request.url);
    url.hostname = url.hostname.replace(/^www\./, '');
    return Response.redirect(url.toString(), 301);
  }

  // Serve blocking robots.txt on pages.dev to prevent indexing
  if (isPagesDev && pathname === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Serve favicon.svg for /favicon.ico and /apple-touch-icon.png requests
  // so all browsers and iOS get the correct icon without needing binary assets
  if (pathname === '/favicon.ico' || pathname === '/apple-touch-icon.png') {
    const svgUrl = new URL('/favicon.svg', context.request.url);
    const svgResponse = await fetch(svgUrl.toString());
    return new Response(svgResponse.body, {
      headers: {
        'Content-Type': pathname === '/favicon.ico' ? 'image/x-icon' : 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  const response = await context.next();

  // Stamp noindex on every pages.dev response so crawlers ignore it
  if (isPagesDev) {
    const patched = new Response(response.body, response);
    patched.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return patched;
  }

  return response;
}
