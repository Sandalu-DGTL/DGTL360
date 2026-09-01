import Image from 'next/image';
import Link from 'next/link';
import { CursorVideoBackground } from './cursor-video-background.client';
import styles from '../hero.module.css';

const supportingCards = [
  {
    number: '07',
    label: 'EVENTS & EXPERIENCES',
    copy: 'Good energy. Tight run sheet.',
    image: '/assets/services/events-experiences-v01.webp',
    accent: '#8d33ff',
  },
  {
    number: '01',
    label: 'PRODUCTION',
    copy: 'Sound, film and motion that earn the replay.',
    image: '/assets/services/production-v01.webp',
    accent: '#ff5c35',
  },
];

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

      <div className={styles.field} aria-label="Selected DGTL services">
        <article className={`${styles.card} ${styles.primaryCard}`}>
          <Image
            src="/assets/services/agentic-systems-v01.webp"
            alt="DGTL 360 Agentic Systems visual study"
            fill
            sizes="(max-width: 900px) 86vw, 38vw"
            style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
            preload
          />
          <span className={styles.imageShade} />
          <span className={styles.number} style={{ background: '#00aee8' }}>
            08
          </span>
          <div className={styles.cardCopy}>
            <p>DETAIL PAGE · PROPOSED</p>
            <h2>AGENTIC<br />SYSTEMS</h2>
            <span>Give the repetitive bits to the machines.</span>
            <Link href="/services/agentic-systems">EXPLORE SERVICE ↗</Link>
          </div>
        </article>

        {supportingCards.map((card, index) => (
          <article
            className={`${styles.card} ${styles.supportCard} ${index === 0 ? styles.topCard : styles.bottomCard}`}
            key={card.number}
          >
            <Image
              src={card.image}
              alt=""
              fill
              sizes="24vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <span className={styles.imageShade} />
            <span className={styles.number} style={{ background: card.accent }}>
              {card.number}
            </span>
            <div className={styles.cardCopy}>
              <h2>{card.label}</h2>
              <span>{card.copy}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
