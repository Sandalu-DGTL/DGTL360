# Architecture

The site uses a feature-first structure so visual sections, styles, content, and interactive behaviour stay easy to locate as the site grows.

```text
dgtl-360/
├── docs/                         # Architecture and maintenance notes
├── public/
│   ├── assets/reference/         # Approved source imagery and visual references
│   ├── favicon.svg
│   └── og.png                    # Social sharing image
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── page.tsx          # Homepage composition
│   │   │   └── services/[slug]/  # All eight service detail routes
│   │   ├── globals.css           # Tokens, resets, global accessibility rules
│   │   ├── layout.tsx            # Fonts and global metadata
│   │   └── not-found.tsx         # Unknown route state
│   ├── components/
│   │   └── layout/               # Shared site-wide layout components
│   ├── content/
│   │   └── local/services.ts     # Typed service content source
│   └── features/
│       ├── company/              # Who-we-are and attitude sections
│       ├── enquiry/              # Shared enquiry form
│       ├── hero/                 # Homepage opening composition
│       ├── identity/             # DGTL field/brand transition
│       ├── navigation/           # Global navigation
│       ├── services/             # Homepage cards and detail-page template
│       └── team/                 # Interactive team/profile system
├── .openai/hosting.json          # Sites project binding
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Rules for future changes

1. Keep route files thin. Compose feature components in `src/app`; do not place large UI implementations there.
2. Keep service copy in `src/content/local/services.ts`; do not duplicate it in route components.
3. Put feature-specific styles beside the feature using CSS Modules.
4. Put reusable site-wide layout pieces in `src/components`, not inside one feature.
5. Add client rendering only to the smallest interactive component that needs browser state.
6. Use direct imports across server/client boundaries. Avoid barrels that mix client and server components.
7. Store secrets in deployment environment variables; never commit `.env` files.

## Scaling path

- Move local content to a headless CMS when non-developers need frequent publishing.
- Replace the mailto form with a server endpoint, spam protection, and CRM/webhook delivery.
- Add image derivatives or managed image delivery when final photography replaces the reference composites.
- Add analytics, error monitoring, and performance budgets before a high-traffic campaign launch.
- Keep the single web application until release ownership or operational boundaries justify separate services.
