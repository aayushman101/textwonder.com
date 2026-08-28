export async function onRequest(context) {
  const host = context.request.headers.get('host') || '';
  const isPagesDev = host.includes('pages.dev');
  const { pathname } = new URL(context.request.url);

  // Redirect www → non-www with 301, normalizing the trailing slash in the
  // same hop so www requests don't chain into a second Pages-issued redirect
  if (host.startsWith('www.') && !isPagesDev) {
    const url = new URL(context.request.url);
    url.hostname = url.hostname.replace(/^www\./, '');
    if (!url.pathname.endsWith('/') && !/\.[a-zA-Z0-9]+$/.test(url.pathname)) {
      url.pathname += '/';
    }
    return Response.redirect(url.toString(), 301);
  }

  // Serve blocking robots.txt on pages.dev to prevent indexing
  if (isPagesDev && pathname === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // NOTE: /favicon.ico and /apple-touch-icon.png used to be intercepted here
  // and answered with favicon.svg. That served SVG bytes under
  // Content-Type: image/x-icon, which no browser can decode as an icon, and
  // gave iOS an SVG where it requires PNG. Real binaries now exist in
  // public/ (favicon.ico, apple-touch-icon.png, favicon-48/192.png), so the
  // static handler serves them correctly and the rewrite is gone.

  const response = await context.next();

  // Stamp noindex on every pages.dev response so crawlers ignore it
  if (isPagesDev) {
    const patched = new Response(response.body, response);
    patched.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return patched;
  }

  return response;
}
