import Link from 'next/link';
import type { CSSProperties } from 'react';
import { EnquirySection } from '../../../enquiry';
import { services } from '../../../../content/local/services';
import type { Service } from '../../types/service.types';
import { ServiceDetailFooter } from './service-detail-footer';
import { ServiceImageCarousel } from './service-image-carousel.client';
import { ServiceRevealController } from './service-reveal-controller.client';
import styles from '../../service-detail.module.css';

export function ServiceDetailPage({ service }: { service: Service }) {
  const currentIndex = services.findIndex((item) => item.slug === service.slug);
  const previous = services[(currentIndex - 1 + services.length) % services.length];
  const next = services[(currentIndex + 1) % services.length];

  return (
    <div className={styles.page} style={{ '--service-accent': service.accent } as CSSProperties}>
      <ServiceRevealController />
      <header className={styles.header}>
        <Link href="/">DGTL 360</Link>
        <nav aria-label="Service breadcrumb">
          <Link href="/#top">← SERVICES</Link>
          <span>{String(service.order).padStart(2, '0')} / {service.label.toUpperCase()}</span>
        </nav>
      </header>

      <main className={styles.layout}>
        <div className={styles.content}>
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <h1 data-service-reveal style={{ '--reveal-delay': '0ms' } as CSSProperties}>
                {service.label}
              </h1>
              <p data-service-reveal style={{ '--reveal-delay': '100ms' } as CSSProperties}>
                {service.detailDescription}
              </p>
            </div>
            <div
              className={styles.carouselReveal}
              data-service-reveal
              data-reveal-kind="carousel"
              style={{ '--reveal-delay': '120ms' } as CSSProperties}
            >
              <ServiceImageCarousel currentSlug={service.slug} accent={service.accent} />
            </div>
          </section>

          <section className={styles.sections} aria-label={`${service.label} capabilities`}>
            {service.sections.map((section, index) => (
              <details key={section.title}>
                <summary>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <i aria-hidden="true">+</i>
                </summary>
                <div className={styles.sectionBody}>
                  {section.body?.split('\n\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items && section.items.length > 0 ? (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item.title}>
                          <em>{item.title}</em>
                          {item.description ? <> — {item.description}</> : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </details>
            ))}
          </section>

          <nav className={styles.pagination} aria-label="Adjacent services">
            <Link href={`/services/${previous.slug}`}>
              <span>← PREVIOUS</span>
              <strong>{previous.label}</strong>
            </Link>
            <Link href={`/services/${next.slug}`}>
              <span>NEXT →</span>
              <strong>{next.label}</strong>
            </Link>
          </nav>
        </div>

        <aside className={styles.contact}>
          <EnquirySection compact />
        </aside>
      </main>
      <ServiceDetailFooter />
    </div>
  );
}
