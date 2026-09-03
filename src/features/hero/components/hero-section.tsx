'use client';

import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../../content/local/services';
import { CursorVideoBackground } from './cursor-video-background.client';
import styles from '../hero.module.css';

const DESKTOP_QUERY = '(min-width: 1001px)';

function getWheelPosition(index: number, activeIndex: number) {
  const total = services.length;
  const previous = (activeIndex - 1 + total) % total;
  const next = (activeIndex + 1) % total;

  if (index === activeIndex) return 'active';
  if (index === previous) return 'previous';
  if (index === next) return 'next';
  return 'hidden';
}

function TypedText({ text }: { text: string }) {
  return (
    <p className={styles.cardDetails} aria-label={text}>
      {Array.from(text).map((character, index) => (
        <span
          aria-hidden="true"
          className={styles.typedCharacter}
          key={`${character}-${index}`}
          style={{ '--character-delay': `${160 + index * 5}ms` } as CSSProperties}
        >
          {character}
        </span>
      ))}
    </p>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const media = window.matchMedia(DESKTOP_QUERY);
    if (!hero) return;

    let frame = 0;

    const updateMode = () => setIsDesktop(media.matches);
    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!media.matches) return;

        const bounds = hero.getBoundingClientRect();
        const scrollDistance = Math.max(hero.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
        const nextIndex = Math.round(progress * (services.length - 1));
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      });
    };

    updateMode();
    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll, { passive: true });
    media.addEventListener('change', updateMode);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
      media.removeEventListener('change', updateMode);
    };
  }, []);

  const activeService = services[previewIndex ?? activeIndex];
  const progress = ((activeIndex + 1) / services.length) * 100;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const x = event.clientX / bounds.width - 0.5;
    const y = event.clientY / bounds.height - 0.5;
    stage.style.setProperty('--pointer-x', `${x * 12}px`);
    stage.style.setProperty('--pointer-y', `${y * 9}px`);
    stage.style.setProperty('--copy-x', `${x * -3.6}px`);
    stage.style.setProperty('--copy-y', `${y * -2.7}px`);
  };

  const resetPointer = () => {
    stageRef.current?.style.setProperty('--pointer-x', '0px');
    stageRef.current?.style.setProperty('--pointer-y', '0px');
    stageRef.current?.style.setProperty('--copy-x', '0px');
    stageRef.current?.style.setProperty('--copy-y', '0px');
  };

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="top"
      aria-labelledby="hero-title"
      style={{ '--service-scroll-height': `${100 + (services.length - 1) * 72}svh` } as CSSProperties}
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
              ? `SCROLL TO EXPLORE · ${String(activeIndex + 1).padStart(2, '0')} / ${String(services.length).padStart(2, '0')}`
              : 'SERVICES · EIGHT DOORS'}
          </p>
          <div className={styles.serviceWheel}>
            {services.map((service, index) => {
              const position = getWheelPosition(index, activeIndex);
              const isInteractive = !isDesktop || position === 'active';

              return (
                <article
                  className={styles.card}
                  data-position={position}
                  key={service.slug}
                  aria-hidden={isDesktop && position === 'hidden' ? true : undefined}
                  style={{ '--service-accent': service.accent } as CSSProperties}
                  onPointerEnter={() => {
                    if (isInteractive) setPreviewIndex(index);
                  }}
                  onPointerLeave={() => setPreviewIndex(null)}
                  onFocus={() => setPreviewIndex(index)}
                  onBlur={() => setPreviewIndex(null)}
                >
                  <Image
                    className={styles.cardImage}
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 1000px) 92vw, 32vw"
                    style={{ objectFit: 'cover', objectPosition: service.imagePosition }}
                    preload={index === 0}
                  />
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
