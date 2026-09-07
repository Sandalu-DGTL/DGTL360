# Homepage cursor integration review

Branch: `sandaz-dev`  
Baseline: `c8d0b19a8f0c2aa525f3ee747ddd73c59ae8ac7e`  
Review date: 2026-09-07  
Preview: http://localhost:3001/

## Integration

The supplied CursorVideoReveal.tsx replaces the previous Canvas 2D glow/trail renderer. All three GLSL shader strings and both accepted settings objects match the supplied package exactly. The existing `/assets/video/mycelial-transport.mp4` matches the handoff digest:

`0cfedca3895070f73d6b4c1e536be0835b131e52babb711d5d50e75e508e6f52`

There is one interaction root: the existing sticky hero stage. The fixed canvas uses viewport coordinates and cover cropping. It sits at z-index 0 inside the stage, below the grid, title and cards. Stage clipping prevents it bleeding over subsequent homepage sections. The canvas cannot intercept pointer events.

Title/subtitle hooks now belong to nested spans. Service cards have three independent layers: outer orbit/hit area, inner cursor physics, and existing hover/content surface. The service wheel, image grading, content reveal, navigation, typography and later sections retain their existing behavior. No service-page components were edited.

## Files

- Removed: `src/features/hero/components/cursor-video-background.client.tsx` (old 2D renderer).
- Added: `src/features/hero/components/cursor-video-reveal.client.tsx` (ported WebGL field).
- Replaced: `src/features/hero/components/cursor-element-physics.client.tsx` (ported physics).
- Added: `src/features/hero/components/use-cursor-motion.ts` (shared live media-query policy).
- Added: `src/features/hero/cursor-video-reveal.css` (isolated field/physics styles).
- Updated: `src/features/hero/components/hero-section.tsx` (mount and nested surfaces).
- Updated: `src/features/hero/hero.module.css` (remove old cursor transforms; retain orbit/hover styles).

## Deliberate package adaptations

- Existing verified video path; no duplicate media asset.
- Host stacking order and clipping, without changing viewport field coordinates.
- Dedicated third card layer retains the pre-existing hover scale independently of cursor tilt.
- Live media-query subscription tears down/restarts both effects at the desktop breakpoint or when pointer/motion preferences change.
- Empty coalesced-event batches fall back to the actual pointer event. Segment joining, previous-frame bridging, ping-pong state and sample/frame/DPR caps remain intact.
- Resize reallocates the simulation at the new aspect ratio and resets stale input coordinates.
- Hidden documents and offscreen roots pause rendering/video; unmount removes observers, events, animation frames, media and GPU allocations.
- Shader/allocation/video/context failure keeps the static page readable; failed media does not reveal a colored placeholder.
- Broader editable-content exclusion; removed the package's test-impact global event and optional cursor-hiding rules.
- Card geometry is refreshed during movement so scroll-wheel transitions cannot leave stale hit coordinates. Focus/scroll/blur clear transient transforms.
- Card return to rest uses the same transform transition as its active response.

## Validation

- `npm run lint`: pass.
- `npx tsc --noEmit`: pass.
- `npm run build`: pass outside the restricted sandbox; the initial sandbox build stalled and was stopped. All 12 static pages generated.
- `git diff --check`: pass.
- Exact comparison of all three shader sources and both default objects against the supplied files: pass.
- Existing video SHA-256: pass.
- Browser at 1440 × 900: one WebGL canvas, live video upload, no console errors.
- Movement-only interaction: connected video wake across title/empty space towards cards, followed by visible decay back to the base page.
- Left click on the title: radial Mycelial video impact behind legible text.
- Title: nonzero push, perspective tilt and skew while the pointer is on the title and on a card.
- Card: only one inner card surface receives motion variables; leaving clears its active state. Existing hover overlay and service-wheel progression remain functional.
- Service navigation: page loads and homepage canvas count becomes zero.
- 1000px viewport: canvas hidden and title transform is none.
- Resize back to 1200 × 800: WebGL restarts, canvas size matches viewport and video cover remains visible.
- Live resize to 390 × 844: canvas hidden, title variables cleared, no horizontal overflow or console errors.

No test runner is configured in this repository. Browser checks covered the actual interaction instead of adding implementation-mirroring tests.

## Remaining review

Real coarse-pointer devices, OS reduced-motion changes, background-tab behavior, injected GPU/video failures and precise resource-release accounting were reviewed in code but not exhaustively exercised in the browser. No original runnable demo or reference capture was included, so exact perceptual parity still needs Riz's visual review. Defaults and shaders have not been retuned.

The original commit above is the rollback reference for the cursor integration. Subsequent changes on sandaz-dev include the momentum wheel, content updates, contact redesign and footer cleanup. To roll back only this integration, restore the four previously tracked hero files from that baseline, remove the three newly added implementation files, and remove this review note. Review any later edits before doing so.

## Follow-up: service-wheel momentum

The outer card orbit now uses a critically damped spring with retained velocity and continuous card poses. This replaces the rounded-index 260ms transform transitions for desktop motion. Repeated scroll input retargets the moving spring; it does not restart a CSS transition. The existing 36svh per-service scroll distance remains unchanged. Reduced-motion users retain immediate indexed positions; mobile retains its stacked cards.

New module: `src/features/hero/motion/service-wheel.ts`. Four regression tests in `service-wheel.test.mjs` cover acceleration/settling, 60Hz/120Hz equivalence, velocity during reversal, and layout/opacity bounds. Run with `node --experimental-strip-types --test src/features/hero/motion/service-wheel.test.mjs`.

Validation: all four tests, lint, TypeScript, and production build pass. Browser forward/reverse scrolling advances the visible services without console errors. Mobile disables the spring and has no horizontal overflow. Exact trackpad feel remains a subjective review on the user's own hardware.

### Continuous scroll synchronization

Scroll targets are now fractional rather than rounded to a card. The bottom progress line uses the same rendered spring position via `--wheel-progress`, with no independent CSS easing or hover-derived progress. Labels still select the nearest card, but never control motion. A browser check with a 40px scroll confirmed a fractional card pose (top 48.049%, left 42.597%) and matching progress (14.043%) instead of staying at the first card. All five motion tests, lint, and TypeScript pass; no browser console errors were observed.
