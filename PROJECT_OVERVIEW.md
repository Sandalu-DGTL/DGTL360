# DGTL 360 — Project Overview

## Introduction

DGTL 360 is a responsive marketing website for a creative, technology, and business solutions agency. It introduces the company, presents its core values and team, explains eight service areas, and lets visitors send an enquiry. The site combines editorial content with animated, interactive sections and dedicated pages for each service.

This repository contains the website itself. The services, team biographies, and privacy policy are stored in local TypeScript files; there is no database or content management system in the current implementation. The enquiry form is the only server-side feature that sends data to an external service.

## Technology stack

| Layer | Technology in this repository | Purpose |
| --- | --- | --- |
| Runtime and package management | Node.js `>=22.13.0 <27`, npm | Runs the development server, build, and project scripts. `package-lock.json` records the npm dependency tree. |
| Web framework | Next.js `16.3.4` with the App Router and Turbopack | Defines pages, server route handlers, metadata, static generation, and production builds. |
| UI | React `19.2.6`, React DOM `19.2.6` | Renders components and manages interactive state. |
| Programming language | TypeScript `5.9.3`, TSX | Types the content, components, validation, and API code. |
| Styling | CSS Modules, global CSS, Tailwind CSS `4.2.1` through PostCSS | Provides responsive layouts, component styles, animations, and the global stylesheet. Most feature styling is in CSS Modules. |
| Fonts | `next/font/google` with Geist and Geist Mono | Loads and optimizes the interface and monospace fonts. |
| Visual effects | Browser CSS animations, Intersection Observer, Resize Observer, Canvas, and WebGL 2 | Powers scroll reveals, interactive cards, the letter field, and the optional hero video effect. These are browser APIs, not additional installed animation libraries. |
| Images and video | `next/image` plus files under `public/assets/` | Displays the DGTL logo, service artwork, team placeholders, social icons, and video assets. |
| Email delivery | Resend SDK `^6.25.0` | Sends website enquiries from a server-only endpoint. |
| Code quality | ESLint `9.39.4`, `eslint-config-next` `16.3.4`, TypeScript checks | Checks code style and type correctness. |
| Automated tests | Node.js built-in test runner | Tests selected motion logic, input validation, letter data, and bounded JSON reading. |
| Hosting | Vercel project connected to GitHub | Hosts the deployed Next.js application. Vercel is a deployment platform, not an npm dependency. |

Dependency versions above come from `package.json`. The project also has type packages for Node, React, and React DOM, and `postcss` for the CSS build pipeline.

## What the website contains

- **Homepage:** an interactive services hero, “Who we are,” core values, team profiles, enquiry form, DGTL letter field, and footer.
- **Eight service pages:** Production; Branding & Strategy; Digital Marketing; Web Development; App Development; Digital Services; Events & Experiences; and Agentic Biz Systems. Each page uses the same template and its own content, imagery, and metadata.
- **Privacy policy:** a separate page at `/privacy-policy`.
- **Enquiry API:** `POST /api/enquiry` validates a form submission and asks Resend to deliver an email.

The homepage and service pages are defined in `src/app/(site)/`. Service detail pages are generated from the `slug` values in `src/content/local/services.ts`. The privacy policy and enquiry API have their own routes under `src/app/`.

## How the enquiry form works

1. A visitor fills in the enquiry form. The browser sends JSON to `/api/enquiry`.
2. The route checks the request origin, JSON content type, and body size. Server-side validation checks required fields and length limits. A hidden honeypot catches some basic bot submissions.
3. The server builds escaped HTML and plain-text email versions. Resend sends the message to `ENQUIRY_TO_EMAIL`, with the visitor's address set as the reply-to address.
4. The form shows a success or error message. The Resend API key stays on the server.

The current code does not include a shared production rate limiter. See [email setup](docs/email-service.md) and [security review](docs/security-review.md) for more detail.

## Repository map

```text
dgtl-360/
├── src/
│   ├── app/
│   │   ├── (site)/page.tsx                 Homepage composition
│   │   ├── (site)/services/[slug]/page.tsx Service routes and metadata
│   │   ├── api/enquiry/route.ts            Enquiry HTTP endpoint
│   │   ├── privacy-policy/page.tsx         Privacy policy page
│   │   ├── globals.css                     Global styles
│   │   └── layout.tsx                      Fonts and site metadata
│   ├── components/layout/                  Shared logo, footer, and social icons
│   ├── content/local/                       Services, team biographies, privacy text
│   ├── features/
│   │   ├── company/                        Company introduction and values
│   │   ├── enquiry/                        Form, validation, email templates, Resend
│   │   ├── hero/                           Homepage hero and service wheel
│   │   ├── identity/                       Interactive DGTL letter field
│   │   ├── navigation/                     Site navigation
│   │   ├── services/                       Service page components
│   │   └── team/                           Team cards and profiles
│   └── lib/                                Shared animation and HTTP helpers
├── public/assets/                          Brand, service, team, video, and social assets
├── docs/                                   Architecture, email, quality, and security notes
├── next.config.ts                          Next.js configuration and response headers
├── postcss.config.mjs                      Tailwind/PostCSS configuration
├── package.json                            Dependencies and scripts
└── tsconfig.json                           TypeScript configuration
```

For detailed module boundaries and extension rules, see [architecture](docs/architecture.md).

## Run the project locally

Install a compatible Node.js version, then run these commands from the `dgtl-360` directory:

```bash
npm ci
npm run dev -- --port 3001
```

Open <http://localhost:3001/>. The default `npm run dev` command uses port 3000 if no port is specified.

For local enquiry delivery, copy `.env.example` to `.env.local` and supply a valid Resend key and appropriate sender and recipient addresses. The website pages can render without the key, but sending an enquiry will fail until email is configured. Never commit `.env.local` or paste an API key into client-side code.

| Environment variable | Used for |
| --- | --- |
| `RESEND_API_KEY` | Authenticates the server with Resend. Required for sending enquiries. |
| `ENQUIRY_FROM_EMAIL` | Sender address; its domain must be allowed by the Resend account. |
| `ENQUIRY_TO_EMAIL` | Inbox that receives enquiries. |
| `SITE_URL` | Optional canonical host used for metadata. Deployment URLs are used when this is absent. |

## Build and checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run build` creates the production Next.js output. `npm run start` serves that output after a successful build. The Node test suite covers specific logic; it is not a complete browser or email delivery test.

## Deployment and content updates

The repository is connected to a Vercel project. A deployment needs the Next.js framework preset and, for working enquiry email, the server-only environment variables listed above. Vercel builds from the Git branch configured in that project; confirm that branch in Vercel before expecting a push to update production. Changing Vercel environment variables requires a new deployment for the running build to use them.

To update a service, edit `src/content/local/services.ts`; the homepage service entry and the corresponding `/services/[slug]` page both use that data. Team text is in `src/content/local/team.ts`, and privacy text is in `src/content/local/privacy.ts`. The team image files currently include placeholder portraits, so replace them with approved photographs before treating them as real member images.
