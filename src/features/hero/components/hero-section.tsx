import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../../content/local/services';
import { CursorVideoBackground } from './cursor-video-background.client';
import styles from '../hero.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
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

        <div className={styles.activeService}>
          <span className={styles.rule} />
          <p className={styles.serviceLabel}>08 · AGENTIC SYSTEMS</p>
          <p>
            We map repetitive work, connect the right tools and introduce practical
            agents where they genuinely help—visible controls, clear audit trails and
            people still in charge.
          </p>
          <Link href="/services/agentic-systems">EXPLORE THIS SERVICE ↗</Link>
        </div>

        <div className={styles.copyFooter}>
          <a href="#enquiry">TELL US THE PROBLEM ↗</a>
          <a href="#who-we-are">SCROLL THE STORY ↓</a>
        </div>
      </div>

      <div className={styles.field} aria-label="Scroll through DGTL 360 services">
        <p className={styles.scrollHint}>SCROLL SERVICES ↓</p>
        <div className={styles.serviceRail} data-native-scroll>
          {services.map((service, index) => (
            <article className={styles.card} key={service.slug}>
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(max-width: 1000px) 92vw, 52vw"
              style={{ objectFit: 'cover', objectPosition: service.imagePosition }}
              preload={index === 0}
            />
            <span className={styles.imageShade} />
            <span className={styles.number} style={{ background: service.accent }}>
              {String(service.order).padStart(2, '0')}
            </span>
            <p className={styles.cardMeta}>{service.preview}</p>
            <div className={styles.cardCopy}>
              <h2>{service.label}</h2>
              <span>{service.cardHeadline}</span>
              <p className={styles.cardDetails}>{service.detailDescription}</p>
              <Link href={`/services/${service.slug}`}>EXPLORE SERVICE ↗</Link>
            </div>
          </article>
          ))}
        </div>
      </div>
    </section>
  );
}
