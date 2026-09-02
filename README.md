# DGTL 360 Website

Production-ready marketing site for DGTL 360, built from the supplied homepage and service-detail references.

The project uses the Next.js App Router and is ready for Git-based deployment on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy on Vercel

1. Import the `Sandalu-DGTL/DGTL360` GitHub repository in Vercel.
2. Keep the detected framework as **Next.js** and the root directory as the repository root.
3. Leave the build and output settings on their Next.js defaults.
4. Deploy the `main` branch.

The enquiry form uses Resend and requires `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL` in Vercel. Copy `.env.example` to `.env.local` for local development and never commit the real API key. An optional server-only `SITE_URL` can be set when a custom production domain is connected; otherwise Vercel's deployment URL is used for social metadata.

## Quality checks

```bash
npm run lint
npm run build
```

## Project organization

- `src/app/` — routes, global layout, metadata, and error states.
- `src/features/` — self-contained business sections such as hero, services, team, and enquiry.
- `src/components/` — shared layout primitives used across features and routes.
- `src/content/local/` — typed editorial content and service definitions.
- `public/assets/reference/` — supplied visual references used to reproduce the approved direction.
- `docs/` — architecture and maintenance notes.

The eight service pages are generated from one typed content source at `src/content/local/services.ts`. Adding or editing a service there updates both the homepage service field and its detail route.

See [docs/architecture.md](docs/architecture.md) for the full folder map and extension rules.

## Content and forms

The enquiry form posts to the server-only `/api/enquiry` endpoint, which validates the request and sends a notification to `info@dgtl.lk` through Resend. See [docs/email-service.md](docs/email-service.md) for the folder structure, Vercel configuration, DNS setup, safeguards, and testing process.
