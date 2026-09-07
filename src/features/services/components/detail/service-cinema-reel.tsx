'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import type { Service } from '../../types/service.types';
import styles from '../../service-detail.module.css';

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
  const trackRef = useRef<HTMLDivElement>(null);
  const targetVelocityRef = useRef(-28);

  useEffect(() => {
    const track = trackRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!track || reducedMotion.matches) return;

    let animationFrame = 0;
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
      animationFrame = requestAnimationFrame(moveFilm);
    };

    animationFrame = requestAnimationFrame(moveFilm);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
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
        <span>MOVE LEFT / RIGHT · SELECT A FRAME</span>
      </header>

      <div
        className={styles.reelViewport}
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
