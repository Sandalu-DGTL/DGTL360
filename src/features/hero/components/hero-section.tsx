'use client';

import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomeService } from '../../services/types/service.types';
import { CursorVideoBackground } from './cursor-video-background.client';
import styles from '../hero.module.css';

const DESKTOP_QUERY = '(min-width: 1001px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SCROLL_DAMPING = 0.045;
const SCROLL_SETTLE_THRESHOLD = 0.0005;
const SERVICE_SCROLL_STEP = 105;

function getWheelPosition(index: number, activeIndex: number, total: number) {
  const previous = (activeIndex - 1 + total) % total;
  const next = (activeIndex + 1) % total;

  if (index === activeIndex) return 'active';
  if (index === previous) return 'previous';
  if (index === next) return 'next';
  return 'hidden';
}

function TypedText({ text }: { text: string }) {
  return <p className={styles.cardDetails}>{text}</p>;
}

export function HeroSection({ services }: { services: HomeService[] }) {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reactiveCardRef = useRef<HTMLElement | null>(null);
  const pointerFrameRef = useRef(0);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const serviceCount = services.length;

  useEffect(() => {
    const hero = heroRef.current;
    const media = window.matchMedia(DESKTOP_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    if (!hero) return;

    let frame = 0;
    let targetProgress = 0;
    let smoothedProgress = 0;
    let hasInitialProgress = false;

    const updateActiveService = (progress: number) => {
      const nextIndex = Math.round(progress * (serviceCount - 1));
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const easeTowardScrollTarget = () => {
      frame = 0;
      const remaining = targetProgress - smoothedProgress;

      if (Math.abs(remaining) <= SCROLL_SETTLE_THRESHOLD) {
        smoothedProgress = targetProgress;
        updateActiveService(smoothedProgress);
        return;
      }

      smoothedProgress += remaining * SCROLL_DAMPING;
      updateActiveService(smoothedProgress);
      frame = requestAnimationFrame(easeTowardScrollTarget);
    };

    const updateFromScroll = () => {
      if (!media.matches) return;

      const bounds = hero.getBoundingClientRect();
      const scrollDistance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      targetProgress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));

      if (!hasInitialProgress || reducedMotion.matches) {
        hasInitialProgress = true;
        smoothedProgress = targetProgress;
        cancelAnimationFrame(frame);
        frame = 0;
        updateActiveService(smoothedProgress);
        return;
      }

      if (!frame) frame = requestAnimationFrame(easeTowardScrollTarget);
    };

    const updateMode = () => {
      setIsDesktop(media.matches);
      updateFromScroll();
    };

    updateMode();
    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll, { passive: true });
    media.addEventListener('change', updateMode);
    reducedMotion.addEventListener('change', updateFromScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
      media.removeEventListener('change', updateMode);
      reducedMotion.removeEventListener('change', updateFromScroll);
    };
  }, [serviceCount]);

  useEffect(
    () => () => {
      cancelAnimationFrame(pointerFrameRef.current);
    },
    [],
  );

  const selectedIndex = previewIndex ?? activeIndex;
  const activeService = services[selectedIndex];

  const resetReactiveCard = (card: HTMLElement | null) => {
    if (!card) return;
    card.style.setProperty('--card-push-x', '0px');
    card.style.setProperty('--card-push-y', '0px');
    card.style.setProperty('--card-tilt-x', '0deg');
    card.style.setProperty('--card-tilt-y', '0deg');
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || isDesktop !== true) return;
    pointerPositionRef.current = { x: event.clientX, y: event.clientY };

    if (pointerFrameRef.current) return;

    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = 0;
      const stage = stageRef.current;
      if (!stage) return;

      const bounds = stage.getBoundingClientRect();
      const x = (pointerPositionRef.current.x - bounds.left) / bounds.width - 0.5;
      const y = (pointerPositionRef.current.y - bounds.top) / bounds.height - 0.5;
      stage.style.setProperty('--pointer-x', `${x * 12}px`);
      stage.style.setProperty('--pointer-y', `${y * 9}px`);
      stage.style.setProperty('--copy-x', `${x * -3.6}px`);
      stage.style.setProperty('--copy-y', `${y * -2.7}px`);
      stage.style.setProperty('--title-push-x', `${x * 1.98}px`);
      stage.style.setProperty('--title-push-y', `${y * 1.98}px`);
      stage.style.setProperty('--title-skew', `${x * 1.92}deg`);
      stage.style.setProperty('--subtitle-push-x', `${x * 1.2}px`);
      stage.style.setProperty('--subtitle-push-y', `${y * 1.2}px`);

      const target = event.target instanceof Element ? event.target : null;
      const reactiveCard = target?.closest<HTMLElement>('[data-service-frame]') ?? null;

      if (reactiveCardRef.current !== reactiveCard) {
        resetReactiveCard(reactiveCardRef.current);
        reactiveCardRef.current = reactiveCard;
      }

      if (reactiveCard) {
        const cardBounds = reactiveCard.getBoundingClientRect();
        const cardX = Math.min(
          1,
          Math.max(-1, ((pointerPositionRef.current.x - cardBounds.left) / cardBounds.width - 0.5) * 2),
        );
        const cardY = Math.min(
          1,
          Math.max(-1, ((pointerPositionRef.current.y - cardBounds.top) / cardBounds.height - 0.5) * 2),
        );

        reactiveCard.style.setProperty('--card-push-x', `${cardX * 10.45}px`);
        reactiveCard.style.setProperty('--card-push-y', `${cardY * 10.45}px`);
        reactiveCard.style.setProperty('--card-tilt-x', `${cardY * -3.5}deg`);
        reactiveCard.style.setProperty('--card-tilt-y', `${cardX * 3.5}deg`);
      }
    });
  };

  const resetPointer = () => {
    cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = 0;
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--pointer-x', '0px');
    stage.style.setProperty('--pointer-y', '0px');
    stage.style.setProperty('--copy-x', '0px');
    stage.style.setProperty('--copy-y', '0px');
    stage.style.setProperty('--title-push-x', '0px');
    stage.style.setProperty('--title-push-y', '0px');
    stage.style.setProperty('--title-skew', '0deg');
    stage.style.setProperty('--subtitle-push-x', '0px');
    stage.style.setProperty('--subtitle-push-y', '0px');
    resetReactiveCard(reactiveCardRef.current);
    reactiveCardRef.current = null;
  };

  if (!activeService || serviceCount === 0) return null;

  const progress = ((selectedIndex + 1) / serviceCount) * 100;

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="top"
      aria-labelledby="hero-title"
      style={{ '--service-scroll-height': `${100 + (serviceCount - 1) * SERVICE_SCROLL_STEP}svh` } as CSSProperties}
    >
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <CursorVideoBackground />
        <div className={styles.gridTexture} aria-hidden="true" />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>ONE CREW · EIGHT DOORS</p>
          <h1 id="hero-title" className={styles.title}>
            <span>MAKE THE THING.</span>
            <span>MAKE IT LAND.</span>
            <span>MAKE IT WORK.</span>
          </h1>
          <p className={styles.intro}>
            Brand, content, product, growth and the systems underneath—one Colombo crew
            from first sketch to live. Poddak less theatre, much more traction.
          </p>

          <div className={styles.activeService} aria-live="polite">
            <span className={styles.rule} />
            <p className={styles.serviceLabel}>
              {String(activeService.order).padStart(2, '0')} · {activeService.label}
            </p>
            <p>{activeService.summary}</p>
            <Link href={`/services/${activeService.slug}`}>EXPLORE THIS SERVICE ↗</Link>
          </div>

          <div className={styles.copyFooter}>
            <a href="#enquiry">TELL US THE PROBLEM ↗</a>
            <span>SCROLL THE WORK ↓</span>
          </div>
        </div>

        <div className={styles.field} aria-label="DGTL 360 services">
          <p className={styles.scrollHint}>
            {isDesktop
              ? `SCROLL TO EXPLORE · ${String(selectedIndex + 1).padStart(2, '0')} / ${String(services.length).padStart(2, '0')}`
              : 'SERVICES · EIGHT DOORS'}
          </p>
          <div className={styles.serviceWheel}>
            {services.map((service, index) => {
              const position = getWheelPosition(index, activeIndex, serviceCount);
              const isInteractive = isDesktop !== true || position !== 'hidden';
              const shouldRenderImage = isDesktop === false || position !== 'hidden';

              return (
                <article
                  className={styles.card}
                  data-position={position}
                  data-service-frame
                  key={service.slug}
                  aria-hidden={isDesktop && position === 'hidden' ? true : undefined}
                  style={{ '--service-accent': service.accent } as CSSProperties}
                  onPointerEnter={() => {
                    if (isInteractive) setPreviewIndex(index);
                  }}
                  onPointerLeave={(event) => {
                    setPreviewIndex(null);
                    resetReactiveCard(event.currentTarget);
                    if (reactiveCardRef.current === event.currentTarget) {
                      reactiveCardRef.current = null;
                    }
                  }}
                  onFocus={() => setPreviewIndex(index)}
                  onBlur={(event) => {
                    setPreviewIndex(null);
                    resetReactiveCard(event.currentTarget);
                  }}
                >
                  <div className={styles.cardMotion}>
                    {shouldRenderImage ? (
                      <Image
                        className={styles.cardImage}
                        src={service.image}
                        alt=""
                        fill
                        sizes="(max-width: 1000px) 92vw, 32vw"
                        style={{ objectFit: 'cover', objectPosition: service.imagePosition }}
                        preload={index === 0}
                      />
                    ) : null}
                    <span className={styles.imageShade} />
                    <span className={styles.number} style={{ background: service.accent }}>
                      {String(service.order).padStart(2, '0')}
                    </span>
                    <p className={styles.cardMeta}>{service.preview}</p>
                    <div className={styles.cardPreview}>
                      <h2>{service.label}</h2>
                      <span>{service.cardHeadline}</span>
                    </div>
                    <div className={styles.cardOverlay}>
                      <p className={styles.overlayKicker}>{String(service.order).padStart(2, '0')} / {service.preview}</p>
                      <h2>{service.label}</h2>
                      <TypedText text={service.detailDescription} />
                      <Link href={`/services/${service.slug}`} tabIndex={isInteractive ? 0 : -1}>
                        EXPLORE SERVICE ↗
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}
