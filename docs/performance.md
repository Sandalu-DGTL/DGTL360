# Animation performance

- `src/lib/animation/visible-animation.ts` owns the service reel and interactive
  homepage letter animation lifecycle. It cancels frames for hidden tabs, offscreen
  surfaces, and reduced motion.
- Cursor WebGL rendering is capped at 60 FPS. After six seconds without pointer
  input, the trail clears, rendering stops, and video decoding pauses. Pointer
  movement wakes it. Shader settings and the approved video remain unchanged.
- WebGL uniform locations and the packed pointer array are reused. Video texture
  uploads skip unchanged playback timestamps.
- Letter positions use transforms rather than layout properties per frame.
- Removed unused homepage card-description data and overlay CSS. Cards retain
  direct service links and the slower scroll wheel.

## Preview

Use `npm run build` then `npm run start -- --port 3001` for a production preview.
It avoids development compilation and hot-reload overhead. After editing, rebuild
and restart; use `npm run dev -- --port 3001` only when live editing is needed.

## Validation

ESLint, TypeScript, production build, and all ten regression tests pass (wheel motion, enquiry validation, and letter data).
No hardware temperature or battery-life improvement has been measured. Compare
on the same device, viewport, browser, and active tab count when profiling.
