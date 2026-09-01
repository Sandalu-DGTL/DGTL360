import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '../../../../components/layout/site-footer';
import { EnquirySection } from '../../../enquiry';
import { services } from '../../../../content/local/services';
import type { Service } from '../../types/service.types';
import styles from '../../service-detail.module.css';

export function ServiceDetailPage({ service }: { service: Service }) {
  const currentIndex = services.findIndex((item) => item.slug === service.slug);
  const previous = services[(currentIndex - 1 + services.length) % services.length];
  const next = services[(currentIndex + 1) % services.length];

  return (
    <div className={styles.page} style={{ '--service-accent': service.accent } as React.CSSProperties}>
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
              <p>{String(service.order).padStart(2, '0')} · {service.tagline.toUpperCase()}</p>
              <h1>{service.label}</h1>
              <span>{service.detailDescription}</span>
            </div>
            <div className={styles.heroImage}>
              <Image
                src={service.image}
                alt={`${service.label} visual study`}
                fill
                sizes="(max-width: 1000px) 100vw, 48vw"
                style={{ objectFit: 'cover', objectPosition: service.imagePosition }}
                preload
              />
              <span>{String(service.order).padStart(2, '0')} · {service.tagline}</span>
            </div>
          </section>

          <section className={styles.sections} aria-label={`${service.label} capabilities`}>
            {service.sections.map((section, index) => (
              <details key={section.title}>
                <summary>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.sectionTitle}>{section.title}</span>
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
                          <strong>{item.title}</strong>
                          {item.description ? <span>{item.description}</span> : null}
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
          <Link className={styles.allServices} href="/#top">
            BACK TO ALL SERVICES ↑
          </Link>
        </div>

        <aside className={styles.contact}>
          <EnquirySection compact />
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
