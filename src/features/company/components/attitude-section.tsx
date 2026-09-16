'use client';

import { useEffect, useRef } from 'react';
import styles from '../attitude.module.css';

const values = [
  [
    "Curiosity",
    "We ask better questions, keep experimenting, and notice what others miss in technology, culture, and the people we build for."
  ],
  [
    "Fun",
    "We bring energy, humour, and play to serious work. A rewarding process matters just as much as the final product."
  ],
  [
    "A Sense of Adventure",
    "We take the road less travelled, exploring new tools and bold ideas to keep our thinking sharp and our work alive."
  ],
  [
    "Ambition",
    "We aim beyond good enough, pursuing craft, impact, and growth for our clients, our products, and ourselves."
  ],
  [
    "Scope",
    "We see the full picture: brand, product, experience, systems, and the people who move through them."
  ]
];

export function AttitudeSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = cardsRef.current;
    if (!list) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cards = Array.from(list.children) as HTMLElement[];
    let frame = 0;
    let displayedProgress: number | null = null;
    let lastTime = 0;
    const paint = (time: number) => {
      frame = 0;
      // Use the section’s normal document position so pinning cannot freeze progress.
      let sectionTop = 0;
      let element = list.closest('section') as HTMLElement | null;
      while (element) { sectionTop += element.offsetTop; element = element.offsetParent as HTMLElement | null; }
      const viewport = window.innerHeight;
      const targetProgress = motion.matches ? 1 : Math.min(1, Math.max(0,
        (window.scrollY - sectionTop + viewport * 0.95) / (viewport * 0.95),
      ));
      // Time-based smoothing keeps trackpad and mouse-wheel movement equally gentle.
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      if (displayedProgress === null || motion.matches) displayedProgress = targetProgress;
      displayedProgress += (targetProgress - displayedProgress) * (1 - Math.exp(-elapsed / 240));
      if (Math.abs(targetProgress - displayedProgress) < 0.001) displayedProgress = targetProgress;
      const progress = displayedProgress;
      cards.forEach((card, index) => {
        const stagger = index * 0.035;
        const local = motion.matches ? 1 : Math.min(1, Math.max(0, (progress - stagger) / (1 - stagger)));
        const eased = local * local * (3 - 2 * local);
        const remaining = 1 - eased;
        const x = (list.clientWidth / 2 - card.offsetLeft - card.offsetWidth / 2) * remaining;
        const y = (list.clientHeight / 2 - card.offsetTop - card.offsetHeight / 2 + index * 3) * remaining;
        card.style.setProperty('--spread-x', `${x}px`);
        card.style.setProperty('--spread-y', `${y}px`);
        card.style.setProperty('--spread-scale', String(0.82 + eased * 0.18));
        card.style.setProperty('--spread-rotation', `${(index - 2) * 2 * remaining}deg`);
      });
      if (displayedProgress !== targetProgress) frame = requestAnimationFrame(paint);
      else lastTime = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const resize = new ResizeObserver(schedule);
    resize.observe(list);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    paint(performance.now());
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      cards.forEach(card => ['--spread-x', '--spread-y', '--spread-scale', '--spread-rotation'].forEach(property => card.style.removeProperty(property)));
    };
  }, []);

  return (
    <section className={styles.section} id="our-attitude" aria-labelledby="attitude-title">
      <header className={styles.header}>
        <p className={styles.kicker}>OUR ATTITUDE</p>
        <h2 id="attitude-title">Core Values</h2>
        <p>Curiosity, fun, adventure, ambition, and scope. We deliver with care, clarity, and intent — never just to chase a clock.</p>
      </header>
      <div ref={cardsRef} className={styles.values}>
        {values.map(([title, description], index) => (
          <article className={styles.value} key={title} tabIndex={0} aria-label={title}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
          </article>
        ))}
      </div>
      <aside className={styles.work}>
        <h3>How we work</h3>
        <p>We plan, design, build, and ship with care. Deadlines and quality both matter. We never confuse speed with progress.</p>
      </aside>
    </section>
  );
}
