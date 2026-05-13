// GET /api/callback?code=...&state=...
// Step 2 of OAuth: exchange code for access token, postMessage to opener window.
// Target origin is restricted to this site's own origin to prevent token leakage
// to malicious opener windows.

const parseCookies = (header = '') =>
  Object.fromEntries(
    header
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([k]) => k)
  );

const getSiteOrigin = (req) => {
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
};

const sendPage = (res, status, body, origin) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.status(200).send(`<!doctype html><html><body><script>
    (function () {
      var targetOrigin = ${JSON.stringify(origin)};
      function send(){
        if (!window.opener) { document.body.innerText = ${JSON.stringify(body)}; return; }
        window.opener.postMessage('authorization:github:${status}:${JSON.stringify(body)}', targetOrigin);
        window.removeEventListener('message', listen, false);
      }
      function listen(e){
        if (e.origin !== targetOrigin) return;
        if (e.data === 'authorizing:github') send();
      }
      window.addEventListener('message', listen, false);
      window.opener && window.opener.postMessage('authorizing:github', targetOrigin);
    })();
  </script></body></html>`);
};

export default async function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const origin = getSiteOrigin(req);

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET.');
    return;
  }

  const { code, state } = req.query;
  const cookies = parseCookies(req.headers.cookie);

  if (!code || !state || cookies.decap_oauth_state !== state) {
    sendPage(res, 'error', { message: 'Invalid OAuth state.' }, origin);
    return;
  }

  res.setHeader('Set-Cookie', 'decap_oauth_state=; Max-Age=0; Path=/; Secure; SameSite=Lax');

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const data = await tokenRes.json();

    if (!data.access_token) {
      sendPage(res, 'error', { message: data.error_description || 'No access_token returned.' }, origin);
      return;
    }

    sendPage(res, 'success', { token: data.access_token, provider: 'github' }, origin);
  } catch (err) {
    sendPage(res, 'error', { message: err.message }, origin);
  }
}
