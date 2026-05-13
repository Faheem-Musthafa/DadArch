// Vercel Edge Middleware — Basic Auth gate for /admin/*
// Runs on every matching request BEFORE the static admin assets are served.
// Env vars (Vercel Project Settings):
//   ADMIN_USER     — username
//   ADMIN_PASSWORD — strong password (plain). Compared in constant time.

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/auth'],
};

const enc = new TextEncoder();

// Constant-time comparison using Web Crypto (Edge-compatible).
const timingSafeEqual = (a, b) => {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
};

const unauthorized = () =>
  new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="DAD CMS", charset="UTF-8"',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    },
  });

export default function middleware(req) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new Response('CMS auth not configured: missing ADMIN_USER / ADMIN_PASSWORD.', {
      status: 503,
    });
  }

  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Basic ')) return unauthorized();

  let decoded;
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return unauthorized();
  }

  const idx = decoded.indexOf(':');
  if (idx === -1) return unauthorized();

  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);

  const userOk = timingSafeEqual(user, expectedUser);
  const passOk = timingSafeEqual(pass, expectedPass);

  if (!(userOk && passOk)) return unauthorized();

  // Return undefined to let the request continue to the static admin/index.html.
  // Security headers for /admin/* are applied via vercel.json `headers` block.
  return undefined;
}
