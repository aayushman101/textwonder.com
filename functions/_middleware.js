export async function onRequest(context) {
  const response = await context.next();
  const host = context.request.headers.get('host') || '';
  if (host.includes('pages.dev')) {
    const patched = new Response(response.body, response);
    patched.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return patched;
  }
  return response;
}
