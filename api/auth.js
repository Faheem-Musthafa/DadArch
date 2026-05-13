// GET /api/auth
// Short-circuited login: after edge middleware verifies Basic Auth, return the
// server-stored GitHub PAT directly to the Decap CMS opener window via
// postMessage. No external OAuth dance.
//
// Required env vars (Vercel Project Settings → Environment Variables):
//   GITHUB_TOKEN — fine-grained PAT scoped to the content repo, with
//                  "Contents: Read and write" + "Metadata: Read" permissions.

const getSiteOrigin = (req) => {
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
};

export default function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).send('Server misconfigured: missing GITHUB_TOKEN.');
    return;
  }

  const origin = getSiteOrigin(req);
  const messageBody = JSON.stringify({ token, provider: 'github' });
  const successMessage = `authorization:github:success:${messageBody}`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');

  res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Authorizing…</title>
  </head>
  <body>
    <p>Authorizing…</p>
    <script>
      (function () {
        var TARGET = ${JSON.stringify(origin)};
        var MESSAGE = ${JSON.stringify(successMessage)};

        function send() {
          if (!window.opener) {
            document.body.innerText = 'No opener window. Open /admin and click Login.';
            return;
          }
          window.opener.postMessage(MESSAGE, TARGET);
        }

        function listen(e) {
          if (e.origin !== TARGET) return;
          if (e.data === 'authorizing:github') {
            send();
            window.removeEventListener('message', listen);
            setTimeout(function () { window.close(); }, 200);
          }
        }

        window.addEventListener('message', listen, false);
        if (window.opener) window.opener.postMessage('authorizing:github', TARGET);
      })();
    </script>
  </body>
</html>`);
}
