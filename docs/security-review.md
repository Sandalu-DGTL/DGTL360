# Code cleanup and security review — 16 September 2026

Changes made:
- Enforce the enquiry endpoint's 20,000-byte limit on actual streamed bytes, including requests without Content-Length. Cancel oversized streams before parsing.
- Require the exact JSON media type (with optional parameters).
- Add browser headers for MIME sniffing protection, same-origin framing, referrer handling, and disabled camera/microphone/location access. A limited CSP restricts objects, base URLs, framing and form destinations; this is not a complete script-src CSP.
- Disable the framework identification header.
- Enable unused TypeScript local/parameter checks.
- Remove unused service footer styles and a superseded team entrance animation. Preserve current content and layout work.

Validation: ESLint, TypeScript and 13 unit tests pass. npm audit reports zero known advisories across installed production and development dependencies. This is not a security guarantee or penetration test.

Remaining operational work:
- Revoke the Resend credential previously shared in chat and install a replacement in local and Vercel server-only environment settings. Do not commit credentials.
- Configure persistent/shared rate limiting or bot protection for POST /api/enquiry. Origin checks and the existing honeypot do not prevent direct automated requests. An in-memory limit is insufficient across serverless instances.
- Consider a nonce/hash-based script CSP as a separate deployment change, with Next.js hydration and animations verified.

No production deployment or real email was sent during this review.
