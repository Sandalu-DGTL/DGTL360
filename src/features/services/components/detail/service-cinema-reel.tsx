'use client';

import { visibleAnimation } from '../../../../lib/animation/visible-animation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type PointerEvent } from 'react';
import type { Service } from '../../types/service.types';
import styles from '../../service-detail.module.css';

const MOBILE_REEL = '(max-width: 1000px), (pointer: coarse)';
const REDUCED_REEL = '(prefers-reduced-motion: reduce)';
function subscribeReel(onChange: () => void) {
  const queries = [MOBILE_REEL, REDUCED_REEL].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener('change', onChange));
  return () => queries.forEach((query) => query.removeEventListener('change', onChange));
}
function getReelMode() {
  if (window.matchMedia(REDUCED_REEL).matches) return 'static';
  return window.matchMedia(MOBILE_REEL).matches ? 'mobile' : 'desktop';
}
const getServerReelMode = () => 'static';

type CinemaService = Pick<
  Service,
  'slug' | 'label' | 'image' | 'imagePosition' | 'accent'
>;

function ReelCard({
  service,
  currentSlug,
  duplicate,
}: {
  service: CinemaService;
  currentSlug: string;
  duplicate: boolean;
}) {
  const isCurrent = service.slug === currentSlug;

  return (
    <li>
      <Link
        className={styles.reelCard}
        data-current={isCurrent || undefined}
        href={`/services/${service.slug}`}
        aria-current={!duplicate && isCurrent ? 'page' : undefined}
        tabIndex={duplicate ? -1 : undefined}
        style={{ '--reel-accent': service.accent } as CSSProperties}
      >
        <Image
          className={styles.reelImage}
          src={service.image}
          alt=""
          fill
          loading={isCurrent ? 'eager' : 'lazy'}
          sizes="(max-width: 680px) 70vw, (max-width: 1200px) 30vw, 260px"
          style={{ objectFit: 'cover', objectPosition: service.imagePosition }}
        />
        <strong>{service.label}</strong>
      </Link>
    </li>
  );
}

export function ServiceCinemaReel({
  services,
  currentSlug,
}: {
  services: CinemaService[];
  currentSlug: string;
}) {
  const mode = useSyncExternalStore(subscribeReel, getReelMode, getServerReelMode);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetVelocityRef = useRef(-28);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || mode === 'static') return;

    if (mode === 'mobile') {
      let previous = performance.now();
      let direction = 1;
      let pausedUntil = 0;
      let touching = false;
      let focused = false;
      let offset = viewport.scrollLeft;
      const pause = () => { touching = true; };
      const resume = () => { touching = false; pausedUntil = performance.now() + 2200; };
      const focus = () => { focused = true; };
      const blur = () => { focused = false; pausedUntil = performance.now() + 2200; };
      const wheel = () => { pausedUntil = performance.now() + 2200; };
      const animate = (now: number) => {
        const dt = Math.min((now - previous) / 1000, 0.05);
        previous = now;
        if (!document.hidden && !touching && !focused && now > pausedUntil) {
          const end = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
          offset = Math.min(end, Math.max(0, offset + direction * 28 * dt));
          viewport.scrollLeft = offset;
          if (offset >= end) direction = -1;
          if (offset <= 0) direction = 1;
          viewport.dataset.reelDirection = direction > 0 ? 'left' : 'right';
        } else offset = viewport.scrollLeft;
      };
      viewport.addEventListener('pointerdown', pause, { passive: true });
      window.addEventListener('pointerup', resume, { passive: true });
      window.addEventListener('pointercancel', resume, { passive: true });
      viewport.addEventListener('focusin', focus);
      viewport.addEventListener('focusout', blur);
      viewport.addEventListener('wheel', wheel, { passive: true });
      const stopAnimation = visibleAnimation(viewport, animate);
      return () => {
        stopAnimation();
        viewport.removeEventListener('pointerdown', pause);
        window.removeEventListener('pointerup', resume);
        window.removeEventListener('pointercancel', resume);
        viewport.removeEventListener('focusin', focus);
        viewport.removeEventListener('focusout', blur);
        viewport.removeEventListener('wheel', wheel);
        viewport.scrollLeft = 0;
      };
    }

    let position = 0;
    let velocity = targetVelocityRef.current;
    let previousTime = performance.now();

    const moveFilm = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 1000, 0.05);
      const loopWidth = track.scrollWidth / 2;
      previousTime = time;

      velocity += (targetVelocityRef.current - velocity) * (1 - Math.exp(-7 * elapsed));
      position += velocity * elapsed;

      if (loopWidth > 0) {
        while (position <= -loopWidth) position += loopWidth;
        while (position > 0) position -= loopWidth;
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;
    };

    const stopAnimation = visibleAnimation(viewport, moveFilm);

    return () => {
      stopAnimation();
      track.style.removeProperty('transform');
    };
  }, [mode]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (mode !== 'desktop') return;
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerPosition = Math.min(
      1,
      Math.max(0, (event.clientX - bounds.left) / bounds.width),
    );
    const directionStrength = (0.5 - pointerPosition) * 2;

    targetVelocityRef.current = directionStrength * 105;
    event.currentTarget.dataset.reelDirection = directionStrength >= 0 ? 'right' : 'left';
  };

  const handlePointerLeave = () => {
    targetVelocityRef.current = -28;
  };

  return (
    <section className={styles.cinemaReel} aria-labelledby="service-reel-title" data-service-reveal>
      <header className={styles.reelHeader}>
        <p>DGTL 360 / SERVICE REEL</p>
        <h2 id="service-reel-title">Explore every service</h2>
        <span>{mode === 'desktop' ? 'MOVE LEFT / RIGHT · SELECT A FRAME' : 'SWIPE LEFT / RIGHT · SELECT A FRAME'}</span>
      </header>

      <div
        className={styles.reelViewport}
        ref={viewportRef}
        data-reel-direction="left"
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
      >
        <div className={styles.reelTrack} ref={trackRef}>
          {[false, true].map((duplicate) => (
            <ul className={styles.reelList} aria-hidden={duplicate || undefined} key={String(duplicate)}>
              {services.map((service) => (
                <ReelCard
                  service={service}
                  currentSlug={currentSlug}
                  duplicate={duplicate}
                  key={`${duplicate ? 'duplicate' : 'primary'}-${service.slug}`}
                />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
