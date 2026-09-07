'use client';

import { useEffect, useRef } from 'react';
import styles from '../hero.module.css';

const ROOT_SELECTOR = '[data-cursor-physics-root]';
const VIDEO_SOURCE = '/assets/video/mycelial-transport.mp4';
const CURSOR_HOLD_MS = 320;
const TOUCH_HOLD_MS = 1100;
const VIDEO_PAUSE_DELAY_MS = 1500;
const IMPACT_LIFETIME_MS = 760;
const TRAIL_LIFETIME_MS = 680;
const TRAIL_POINT_LIMIT = 72;
const DPR_CAP = 1.1;

type TrailPoint = {
  x: number;
  y: number;
  createdAt: number;
};

type Impact = {
  x: number;
  y: number;
  radius: number;
  startedAt: number;
};

function drawVideoCover(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  width: number,
  height: number,
) {
  const videoWidth = Math.max(video.videoWidth, 1);
  const videoHeight = Math.max(video.videoHeight, 1);
  const scale = Math.max(width / videoWidth, height / videoHeight);
  const renderWidth = videoWidth * scale;
  const renderHeight = videoHeight * scale;

  context.drawImage(
    video,
    (width - renderWidth) / 2,
    (height - renderHeight) / 2,
    renderWidth,
    renderHeight,
  );
}

export function CursorVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = document.querySelector<HTMLElement>(ROOT_SELECTOR);

    if (!canvas || !root) {
      if (canvas) canvas.dataset.revealStatus = 'static-fallback';
      return;
    }

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      canvas.dataset.revealStatus = 'canvas-unavailable';
      return;
    }

    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = VIDEO_SOURCE;

    let animationFrame = 0;
    let lastFrameTime = performance.now();
    let activeUntil = 0;
    let revealAmount = 0;
    let pointerX = root.clientWidth / 2;
    let pointerY = root.clientHeight / 2;
    let trailPoints: TrailPoint[] = [];
    let impacts: Impact[] = [];
    let isVisible = !document.hidden;
    let isIntersecting = true;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;

    const getDpr = () => Math.min(window.devicePixelRatio || 1, DPR_CAP);

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const dpr = getDpr();
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));
      if (canvas.width === width && canvas.height === height) return;

      canvas.width = width;
      canvas.height = height;
      trailPoints = [];
      impacts = [];
    };

    const playForInteraction = () => {
      if (video.paused) void video.play().catch(() => undefined);
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => video.pause(), VIDEO_PAUSE_DELAY_MS);
    };

    const activate = (event: PointerEvent, holdMs: number) => {
      if (!event.isPrimary) return;

      const bounds = root.getBoundingClientRect();
      const dpr = getDpr();
      pointerX = (event.clientX - bounds.left) * dpr;
      pointerY = (event.clientY - bounds.top) * dpr;
      activeUntil = Math.max(activeUntil, performance.now() + holdMs);
      playForInteraction();
    };

    const handlePointerMove = (event: PointerEvent) => {
      activate(event, event.pointerType === 'touch' ? TOUCH_HOLD_MS : CURSOR_HOLD_MS);

      const bounds = root.getBoundingClientRect();
      const dpr = getDpr();
      const now = performance.now();
      const samples = event.getCoalescedEvents?.() ?? [event];
      samples.forEach((sample, index) => {
        trailPoints.push({
          x: (sample.clientX - bounds.left) * dpr,
          y: (sample.clientY - bounds.top) * dpr,
          createdAt: now - (samples.length - index - 1) * 2,
        });
      });
      if (trailPoints.length > TRAIL_POINT_LIMIT) {
        trailPoints = trailPoints.slice(-TRAIL_POINT_LIMIT);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !event.isPrimary) return;
      activate(event, TOUCH_HOLD_MS);

      const dpr = getDpr();
      trailPoints.push({ x: pointerX, y: pointerY, createdAt: performance.now() });
      impacts.push({
        x: pointerX,
        y: pointerY,
        radius: Math.min(root.clientWidth, root.clientHeight) * 0.32 * dpr,
        startedAt: performance.now(),
      });
    };

    const render = (now: number) => {
      animationFrame = requestAnimationFrame(render);
      if (!isVisible || !isIntersecting) {
        lastFrameTime = now;
        return;
      }

      resize();
      const delta = Math.min(now - lastFrameTime, 40);
      lastFrameTime = now;
      trailPoints = trailPoints.filter((point) => now - point.createdAt < TRAIL_LIFETIME_MS);
      const target = now < activeUntil || trailPoints.length > 0 || impacts.length > 0 ? 1 : 0;
      const easing = target > revealAmount ? 0.16 : 0.055;
      const frameEasing = 1 - (1 - easing) ** (delta / 16.67);
      revealAmount += (target - revealAmount) * frameEasing;

      context.clearRect(0, 0, canvas.width, canvas.height);
      if (revealAmount < 0.004 || video.readyState < video.HAVE_CURRENT_DATA) return;

      context.save();
      context.globalAlpha = revealAmount * 0.68;
      context.filter = 'saturate(1.08) contrast(1.18) brightness(0.82)';
      drawVideoCover(context, video, canvas.width, canvas.height);
      context.restore();

      context.save();
      context.globalAlpha = revealAmount;
      context.globalCompositeOperation = 'screen';
      const spotlightRadius = Math.max(canvas.width, canvas.height) * 0.34;
      const spotlight = context.createRadialGradient(
        pointerX,
        pointerY,
        spotlightRadius * 0.04,
        pointerX,
        pointerY,
        spotlightRadius,
      );
      spotlight.addColorStop(0, 'rgba(232, 197, 146, 0.18)');
      spotlight.addColorStop(0.45, 'rgba(158, 97, 51, 0.08)');
      spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = spotlight;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();

      if (trailPoints.length > 1) {
        context.save();
        context.globalCompositeOperation = 'screen';
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.shadowColor = 'rgba(245, 218, 174, 0.9)';
        context.shadowBlur = 24 * getDpr();

        for (let index = 1; index < trailPoints.length; index += 1) {
          const previous = trailPoints[index - 1];
          const point = trailPoints[index];
          const life = Math.max(0, 1 - (now - point.createdAt) / TRAIL_LIFETIME_MS);
          if (life <= 0) continue;

          context.globalAlpha = revealAmount * life ** 1.7 * 0.72;
          context.strokeStyle = `rgba(255, 235, 199, ${0.34 + life * 0.58})`;
          context.lineWidth = (5 + life * 13) * getDpr();
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(point.x, point.y);
          context.stroke();
        }
        context.restore();

        const head = trailPoints[trailPoints.length - 1];
        const headLife = Math.max(0, 1 - (now - head.createdAt) / TRAIL_LIFETIME_MS);
        const headRadius = 46 * getDpr();
        const headGlow = context.createRadialGradient(
          head.x,
          head.y,
          0,
          head.x,
          head.y,
          headRadius,
        );
        headGlow.addColorStop(0, `rgba(255, 244, 218, ${headLife * 0.8})`);
        headGlow.addColorStop(0.28, `rgba(241, 199, 137, ${headLife * 0.34})`);
        headGlow.addColorStop(1, 'rgba(158, 97, 51, 0)');
        context.save();
        context.globalCompositeOperation = 'screen';
        context.fillStyle = headGlow;
        context.fillRect(
          head.x - headRadius,
          head.y - headRadius,
          headRadius * 2,
          headRadius * 2,
        );
        context.restore();
      }

      impacts = impacts.filter((impact) => {
        const progress = (now - impact.startedAt) / IMPACT_LIFETIME_MS;
        if (progress >= 1) return false;

        const eased = 1 - (1 - progress) ** 3;
        context.save();
        context.globalAlpha = revealAmount * (1 - progress) * 0.62;
        context.strokeStyle = 'rgba(235, 211, 174, 0.72)';
        context.lineWidth = Math.max(1, 1.5 * getDpr());
        context.beginPath();
        context.arc(impact.x, impact.y, impact.radius * eased, 0, Math.PI * 2);
        context.stroke();
        context.restore();
        return true;
      });
    };

    const handlePointerLeave = () => {
      activeUntil = performance.now();
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (!isVisible) {
        revealAmount = 0;
        trailPoints = [];
        impacts = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (!isIntersecting) {
          revealAmount = 0;
          trailPoints = [];
          impacts = [];
          context.clearRect(0, 0, canvas.width, canvas.height);
          video.pause();
        }
      },
      { threshold: 0.01 },
    );

    video.addEventListener(
      'loadeddata',
      () => {
        canvas.dataset.revealStatus = 'live';
      },
      { once: true },
    );
    root.addEventListener('pointermove', handlePointerMove, { passive: true });
    root.addEventListener('pointerdown', handlePointerDown, { passive: true });
    root.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    root.addEventListener('pointercancel', handlePointerLeave, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    observer.observe(root);
    resize();
    canvas.dataset.revealStatus = 'loading';
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(pauseTimer);
      observer.disconnect();
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerdown', handlePointerDown);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('pointercancel', handlePointerLeave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      context.clearRect(0, 0, canvas.width, canvas.height);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.cursorVideoCanvas}
      data-cursor-video-reveal
      aria-hidden="true"
    />
  );
}
