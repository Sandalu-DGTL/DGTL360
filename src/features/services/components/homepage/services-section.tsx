'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { services } from '../../../../content/local/services';
import styles from '../../services.module.css';

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <div className={styles.stickyIntro}>
        <p>THE WORK · EIGHT CONNECTED DISCIPLINES</p>
        <h2 id="services-title">Pick a door.<br />Bring the whole problem.</h2>
        <p className={styles.introCopy}>{active.summary}</p>
        <div className={styles.counter} aria-live="polite">
          <span>{String(active.order).padStart(2, '0')}</span>
          <span>/</span>
          <span>08</span>
        </div>
      </div>

      <div className={styles.cards}>
        {services.map((service, index) => (
          <article
            className={`${styles.card} ${index === activeIndex ? styles.active : ''}`}
            key={service.slug}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            style={{ '--service-accent': service.accent } as CSSProperties}
          >
            {/* Native image avoids a Vinext client-bundle React duplication issue. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt=""
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: service.imagePosition,
              }}
            />
            <div className={styles.imageTreatment} />
            <div className={styles.cardTop}>
              <span>{String(service.order).padStart(2, '0')}</span>
              <span>{service.preview}</span>
            </div>
            <div className={styles.cardBody}>
              <h3>{service.label}</h3>
              <p>{service.cardHeadline}</p>
              <a href={`/services/${service.slug}`}>EXPLORE SERVICE ↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
