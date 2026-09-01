'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { services } from '../../../../content/local/services';
import styles from '../../service-detail.module.css';

const SLIDE_INTERVAL_MS = 4200;

export function ServiceImageCarousel({
  currentSlug,
  accent,
}: {
  currentSlug: string;
  accent: string;
}) {
  const slides = useMemo(() => {
    const current = services.find((service) => service.slug === currentSlug);
    return current
      ? [current, ...services.filter((service) => service.slug !== currentSlug)]
      : services;
  }, [currentSlug]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    const updateVisibility = () => setPaused(document.hidden);

    updateMotionPreference();
    updateVisibility();
    motionPreference.addEventListener('change', updateMotionPreference);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      motionPreference.removeEventListener('change', updateMotionPreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, slides.length]);

  return (
    <div
      className={styles.carousel}
      style={{ '--service-accent': accent } as CSSProperties}
      aria-label="Service image carousel"
    >
      <div className={styles.slides}>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <figure
              className={`${styles.slide} ${isActive ? styles.activeSlide : ''}`}
              key={slide.slug}
              aria-hidden={!isActive}
            >
              {/* Native image avoids a Vinext client-bundle React duplication issue. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={isActive ? `${slide.label} service visual` : ''}
                decoding="async"
              />
              <figcaption>
                <span>{String(slide.order).padStart(2, '0')}</span>
                {slide.label}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className={styles.carouselProgress} aria-label="Choose a carousel slide">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.slug}
            className={index === activeIndex ? styles.activeProgress : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${slide.label}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span
              key={`${activeIndex}-${paused}-${reducedMotion}`}
              style={{ animationPlayState: paused ? 'paused' : 'running' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
