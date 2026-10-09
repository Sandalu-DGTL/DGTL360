# Asset organization

Only runtime media belongs under `public/assets/`. Reference screenshots live in `docs/design-references/` and are not publicly served.

| Folder | Purpose |
| --- | --- |
| `public/assets/team/portraits/` | Supplied neutral portraits for the team grid |
| `public/assets/team/selected/` | Supplied orange portraits shown when selected |
| `public/assets/team/placeholders/` | Temporary images for Sunera and Rehan |
| `public/assets/services/` | Service artwork shared by cards and detail pages |
| `public/assets/brand/` | DGTL logo |
| `public/assets/social/` | Icons used by the footer |
| `public/assets/video/` | Hero video |

Team image paths and biographies are defined in `src/content/local/team.ts`. Service artwork is defined in `src/content/local/services.ts`. Update those sources when replacing media; keep reusable assets in one location. Next.js Image handles responsive delivery of portraits and service artwork.

The user assigned Sandalu 01/02 to Thushan Ekanayaka. Riz, Kasuni, Prasad (PJ), Lavanga, Nipuna, and Thushan have neutral and orange portraits. Sunera and Rehan still use temporary sample photos, not photos of those members:

- `team/placeholders/dummy-4.jpg`: https://randomuser.me/api/portraits/men/32.jpg
- `team/placeholders/dummy-5.jpg`: https://randomuser.me/api/portraits/men/46.jpg

## Social icon attribution

Locally served SVGs were extracted from Iconify collections:

- @iconify-json/logos 1.2.14: YouTube and TikTok (SVG Logos, CC0).
- @iconify-json/simple-icons 1.2.95: Instagram and WhatsApp (Simple Icons, CC0).
- @iconify-json/fa6-brands 1.2.6: LinkedIn (Font Awesome Free by Fonticons, Inc., CC BY 4.0).

Sources: https://github.com/gilbarbara/logos, https://github.com/simple-icons/simple-icons, https://github.com/FortAwesome/Font-Awesome.
Font Awesome attribution: https://fontawesome.com/ — https://creativecommons.org/licenses/by/4.0/
Brand trademarks belong to their respective owners.

`src/app/icon.png`, `public/favicon.svg`, and `public/og.png` retain their framework/metadata locations.
