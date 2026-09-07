'use client';

import { useEffect, useRef } from 'react';

const ROOT_SELECTOR = '[data-cursor-physics-root]';

const settings = {
  cardCoupling: 0.97,
  cardPush: 5.99,
  cardTilt: 0.5,
  titleCoupling: 1.46,
  titlePush: 2.59,
  titleTilt: 2,
  titleSkew: 0.659,
  subtitleCoupling: 0.8806,
};

const titleVariables = [
  '--cursor-title-x',
  '--cursor-title-y',
  '--cursor-title-tilt-x',
  '--cursor-title-tilt-y',
  '--cursor-title-skew',
] as const;
const subtitleVariables = ['--cursor-subtitle-x', '--cursor-subtitle-y'] as const;
const cardVariables = [
  '--cursor-card-x',
  '--cursor-card-y',
  '--cursor-card-tilt-x',
  '--cursor-card-tilt-y',
] as const;

function removeVariables(element: HTMLElement | null, variables: readonly string[]) {
  if (!element) return;
  variables.forEach((variable) => element.style.removeProperty(variable));
}

export function CursorElementPhysics() {
  const frameRef = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const narrowViewport = window.matchMedia('(max-width: 1000px)');

    if (reducedMotion.matches || coarsePointer.matches || narrowViewport.matches) return;

    const root = document.querySelector<HTMLElement>(ROOT_SELECTOR);
    if (!root) return;

    const title = root.querySelector<HTMLElement>('[data-cursor-title-surface]');
    const subtitle = root.querySelector<HTMLElement>('[data-cursor-subtitle-surface]');
    let activeCard: HTMLElement | null = null;
    let activeSurface: HTMLElement | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let cardX = 0;
    let cardY = 0;

    const clearCard = () => {
      removeVariables(activeSurface, cardVariables);
      activeCard = null;
      activeSurface = null;
    };

    const reset = () => {
      clearCard();
      removeVariables(title, titleVariables);
      removeVariables(subtitle, subtitleVariables);
    };

    const apply = () => {
      frameRef.current = 0;
      title?.style.setProperty(
        '--cursor-title-x',
        `${pointerX * 2 * settings.titlePush * settings.titleCoupling}px`,
      );
      title?.style.setProperty(
        '--cursor-title-y',
        `${pointerY * 2 * settings.titlePush * settings.titleCoupling}px`,
      );
      title?.style.setProperty(
        '--cursor-title-tilt-x',
        `${-pointerY * 2 * settings.titleTilt * settings.titleCoupling}deg`,
      );
      title?.style.setProperty(
        '--cursor-title-tilt-y',
        `${pointerX * 2 * settings.titleTilt * settings.titleCoupling}deg`,
      );
      title?.style.setProperty(
        '--cursor-title-skew',
        `${pointerX * 2 * settings.titleSkew * settings.titleCoupling}deg`,
      );
      subtitle?.style.setProperty(
        '--cursor-subtitle-x',
        `${pointerX * 2 * settings.titlePush * settings.subtitleCoupling}px`,
      );
      subtitle?.style.setProperty(
        '--cursor-subtitle-y',
        `${pointerY * 2 * settings.titlePush * settings.subtitleCoupling}px`,
      );

      activeSurface?.style.setProperty(
        '--cursor-card-x',
        `${cardX * 2 * settings.cardPush * settings.cardCoupling}px`,
      );
      activeSurface?.style.setProperty(
        '--cursor-card-y',
        `${cardY * 2 * settings.cardPush * settings.cardCoupling}px`,
      );
      activeSurface?.style.setProperty(
        '--cursor-card-tilt-x',
        `${-cardY * 2 * settings.cardTilt * settings.cardCoupling}deg`,
      );
      activeSurface?.style.setProperty(
        '--cursor-card-tilt-y',
        `${cardX * 2 * settings.cardTilt * settings.cardCoupling}deg`,
      );
    };

    const requestUpdate = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(apply);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      if (event.target instanceof Element && event.target.closest('[data-cursor-ui]')) return;

      const rootBounds = root.getBoundingClientRect();
      pointerX = (event.clientX - rootBounds.left) / Math.max(rootBounds.width, 1) - 0.5;
      pointerY = (event.clientY - rootBounds.top) / Math.max(rootBounds.height, 1) - 0.5;

      const nextCard =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('[data-cursor-card]')
          : null;

      if (nextCard !== activeCard) {
        clearCard();
        activeCard = nextCard;
        activeSurface = nextCard?.querySelector<HTMLElement>('[data-cursor-card-surface]') ?? null;
      }

      if (activeCard) {
        const cardBounds = activeCard.getBoundingClientRect();
        cardX = (event.clientX - cardBounds.left) / Math.max(cardBounds.width, 1) - 0.5;
        cardY = (event.clientY - cardBounds.top) / Math.max(cardBounds.height, 1) - 0.5;
      }

      requestUpdate();
    };

    const handlePointerLeave = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      reset();
    };

    root.addEventListener('pointermove', handlePointerMove, { passive: true });
    root.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    root.addEventListener('pointercancel', handlePointerLeave, { passive: true });
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      reset();
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('pointercancel', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, []);

  return null;
}
