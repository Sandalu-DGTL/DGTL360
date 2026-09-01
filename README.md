# DGTL 360 Website

Production-ready marketing site for DGTL 360, built from the supplied homepage and service-detail references.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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

The enquiry form currently opens the visitor's email client and addresses the message to `hello@dgtl.lk`. Replace this with a server-side form endpoint or CRM integration when the final destination is selected.
