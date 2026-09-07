'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomeService } from '../../services/types/service.types';
import { CursorElementPhysics } from './cursor-element-physics.client';
import { CursorVideoReveal } from './cursor-video-reveal.client';
import '../cursor-video-reveal.css';
import styles from '../hero.module.css';
import { advanceWheel, wheelPose, wheelProgress } from '../motion/service-wheel';

const DESKTOP_QUERY = '(min-width: 1001px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SCROLL_SETTLE_THRESHOLD = 0.001;
const SERVICE_SCROLL_STEP = 36;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const serviceCount = services.length;

  useEffect(() => {
    const hero = heroRef.current;
    const media = window.matchMedia(DESKTOP_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    if (!hero) return;

    const cards = Array.from(hero.querySelectorAll<HTMLElement>('[data-cursor-card]'));
    let frame = 0;
    let target = 0;
    let motion = { position: 0, velocity: 0 };
    let initialized = false;
    let lastTime = 0;

    const paint = () => {
      hero.style.setProperty('--wheel-progress', String(wheelProgress(motion.position, serviceCount)));
      const nearest = Math.min(serviceCount - 1, Math.max(0, Math.round(motion.position)));
      setActiveIndex((current) => current === nearest ? current : nearest);
      cards.forEach((card, index) => {
        const pose = wheelPose(index, motion.position, serviceCount);
        card.style.setProperty('--orbit-top', `${pose.top}%`);
        card.style.setProperty('--orbit-left', `${pose.left}%`);
        card.style.setProperty('--orbit-opacity', String(pose.opacity));
        card.style.setProperty('--orbit-transform', pose.transform);
        card.style.setProperty('--orbit-visibility', pose.visible ? 'visible' : 'hidden');
      });
    };

    const animate = (time: number) => {
      frame = 0;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      motion = advanceWheel(motion, target, dt);
      if (Math.abs(target - motion.position) < SCROLL_SETTLE_THRESHOLD
        && Math.abs(motion.velocity) < SCROLL_SETTLE_THRESHOLD) {
        motion = { position: target, velocity: 0 };
        paint();
        return;
      }
      paint();
      frame = requestAnimationFrame(animate);
    };

    const updateFromScroll = () => {
      if (!media.matches) return;
      const bounds = hero.getBoundingClientRect();
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / distance));
      target = progress * (serviceCount - 1);
      if (!initialized || reducedMotion.matches || document.hidden) {
        initialized = true;
        cancelAnimationFrame(frame);
        frame = 0;
        motion = { position: target, velocity: 0 };
        paint();
        return;
      }
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };

    const updateMode = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      initialized = false;
      setIsDesktop(media.matches);
      if (media.matches && !reducedMotion.matches) hero.dataset.orbitAnimated = 'true';
      else delete hero.dataset.orbitAnimated;
      updateFromScroll();
    };

    updateMode();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll, { passive: true });
    document.addEventListener('visibilitychange', updateFromScroll);
    media.addEventListener('change', updateMode);
    reducedMotion.addEventListener('change', updateMode);

    return () => {
      cancelAnimationFrame(frame);
      delete hero.dataset.orbitAnimated;
      hero.style.removeProperty('--wheel-progress');
      cards.forEach((card) => {
        ['top', 'left', 'opacity', 'transform', 'visibility'].forEach((property) => {
          card.style.removeProperty(`--orbit-${property}`);
        });
      });
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
      document.removeEventListener('visibilitychange', updateFromScroll);
      media.removeEventListener('change', updateMode);
      reducedMotion.removeEventListener('change', updateMode);
    };
  }, [serviceCount]);

  const selectedIndex = previewIndex ?? activeIndex;
  const activeService = services[selectedIndex];

  if (!activeService || serviceCount === 0) return null;

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="top"
      aria-labelledby="hero-title"
      style={{ '--service-scroll-height': `${100 + (serviceCount - 1) * SERVICE_SCROLL_STEP}svh` } as CSSProperties}
    >
      <div className={styles.stage} data-cursor-physics-root>
        <CursorVideoReveal videoSrc="/assets/video/mycelial-transport.mp4" />
        <CursorElementPhysics />
        <div className={styles.gridTexture} aria-hidden="true" />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>ONE CREW · EIGHT DOORS</p>
          <h1 id="hero-title" className={styles.title}>
            <span data-cursor-title-surface>
              <span>MAKE THE THING.</span>
              <span>MAKE IT LAND.</span>
              <span>MAKE IT WORK.</span>
            </span>
          </h1>
          <p className={styles.intro}>
            <span data-cursor-subtitle-surface>
              Brand, content, product, growth and the systems underneath—one Colombo crew
              from first sketch to live. Poddak less theatre, much more traction.
            </span>
          </p>

          <div className={styles.activeService} aria-live="polite">
            <span className={styles.rule} />
            <p className={styles.serviceLabel}>
              {String(activeService.order).padStart(2, '0')} · {activeService.label}
            </p>
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
              const shouldRenderImage = isDesktop !== null || position !== 'hidden';

              return (
                <article
                  className={styles.card}
                  data-position={position}
                  data-cursor-card
                  key={service.slug}
                  aria-hidden={isDesktop && position === 'hidden' ? true : undefined}
                  style={{ '--service-accent': service.accent } as CSSProperties}
                  onPointerEnter={() => {
                    if (isInteractive) setPreviewIndex(index);
                  }}
                  onPointerLeave={() => {
                    setPreviewIndex(null);
                  }}
                  onFocus={() => setPreviewIndex(index)}
                  onBlur={() => {
                    setPreviewIndex(null);
                  }}
                >
                  <div className={styles.cardPhysics} data-cursor-card-surface>
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
                        <h2>{service.label}</h2>
                        <TypedText text={service.detailDescription} />
                        <Link href={`/services/${service.slug}`} tabIndex={isInteractive ? 0 : -1}>
                          EXPLORE SERVICE ↗
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
