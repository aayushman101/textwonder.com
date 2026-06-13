export async function onRequest(context) {
  const host = context.request.headers.get('host') || '';
  const isPagesDev = host.includes('pages.dev');

  // Serve a blocking robots.txt on the pages.dev domain
  if (isPagesDev && new URL(context.request.url).pathname === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain' },
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
