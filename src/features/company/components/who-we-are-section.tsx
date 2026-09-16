'use client';

import { useEffect, useRef } from 'react';
import styles from '../about.module.css';

export function WhoWeAreSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!motion.matches) {
        section.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element, index) => {
          animations.push(element.animate([
            { opacity: 0, transform: 'translateY(28px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 650, delay: index * 65, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
        });
      }
      observer.disconnect();
    }, { threshold: 0.15 });
    const stopMotion = () => { if (motion.matches) animations.forEach(animation => animation.cancel()); };
    motion.addEventListener('change', stopMotion);
    observer.observe(section);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      motion.removeEventListener('change', stopMotion);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="who-we-are" aria-labelledby="who-title">
      <header data-reveal className={styles.aboutHeader}>
        <p className={styles.kicker}>Who we are</p>
        <h2 id="who-title">One crew.<br /><span>Every angle.</span></h2>
        <p className={styles.tagline}>Creative. Technology. Business.</p>
      </header>
      <div className={styles.aboutContent}>
      <div className={styles.aboutCopy}>
        <p data-reveal className={styles.lead}>We are a 360° creative, technology, and business solutions agency that transforms ideas into impactful brands and scalable businesses.</p>
        <p data-reveal>By combining strategy, design, marketing, technology, AI, media production, and event management, we deliver end-to-end solutions that help organizations launch, grow, and lead in an ever-evolving digital world.</p>
        <p data-reveal>Our focus is simple: create measurable value through innovation, creativity, and execution excellence.</p>
      </div>
      </div>
    </section>
  );
}
