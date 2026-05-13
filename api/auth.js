// GET /api/auth
// Step 1 of OAuth: redirect user to GitHub authorization.

import crypto from 'node:crypto';

const SCOPE = 'repo,user';

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('Missing OAUTH_CLIENT_ID env var.');
    return;
  }

  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const redirectUri = `${proto}://${host}/api/callback`;

  const state = crypto.randomBytes(16).toString('hex');

  res.setHeader(
    'Set-Cookie',
    `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
  );

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', SCOPE);
  url.searchParams.set('state', state);

  res.redirect(302, url.toString());
}
