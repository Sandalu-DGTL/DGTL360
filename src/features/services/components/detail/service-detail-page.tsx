import Link from 'next/link';
import type { CSSProperties } from 'react';
import { EnquirySection } from '../../../enquiry/components/enquiry-section';
import { services } from '../../../../content/local/services';
import type { Service } from '../../types/service.types';
import { ServiceCapabilityList } from './service-capability-list.client';
import { ServiceCinemaReel } from './service-cinema-reel';
import { ServiceDetailFooter } from './service-detail-footer';
import { ServiceHeroImage } from './service-hero-image';
import { ServiceRevealController } from './service-reveal-controller.client';
import styles from '../../service-detail.module.css';

export function ServiceDetailPage({ service }: { service: Service }) {
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
              <ServiceHeroImage service={service} />
            </div>
          </section>

          <section className={styles.sections} aria-label={`${service.label} capabilities`}>
            <ServiceCapabilityList sections={service.sections} />
          </section>

          <ServiceCinemaReel services={services} currentSlug={service.slug} />
        </div>

        <aside className={styles.contact}>
          <EnquirySection compact />
        </aside>
      </main>
      <ServiceDetailFooter />
    </div>
  );
}
