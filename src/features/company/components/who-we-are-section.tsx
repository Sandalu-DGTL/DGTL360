import styles from '../about.module.css';

export function WhoWeAreSection() {
  const capabilities = [
    'Production',
    'Brand & strategy',
    'Digital marketing',
    'Web development',
    'App development',
    'Digital services',
    'Events & experiences',
    'Agentic AI',
  ];

  return (
    <section className={`${styles.aboutSection} ${styles.whoViewport}`} id="who-we-are" aria-labelledby="who-title">
      <header className={styles.aboutHeader}>
        <p className={styles.kicker}>Who we are</p>
        <h2 id="who-title">One crew.<br /><span>Every angle.</span></h2>
        <p className={styles.tagline}>Creative. Technology. Business.</p>
      </header>
      <div className={styles.aboutContent}>
      <div className={styles.aboutCopy}>
        <p className={styles.lead}>We are a 360° creative, technology, and business solutions agency that transforms ideas into impactful brands and scalable businesses.</p>
        <p>By combining strategy, design, marketing, technology, AI, media production, and event management, we deliver end-to-end solutions that help organizations launch, grow, and lead in an ever-evolving digital world.</p>
        <p>Our focus is simple: create measurable value through innovation, creativity, and execution excellence.</p>
      </div>
      <ul className={styles.capabilities} aria-label="Our capabilities">
        {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
      </ul>
      <a className={styles.companyCta} href="#enquiry">Let’s build something <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
