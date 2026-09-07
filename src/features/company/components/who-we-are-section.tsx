import styles from '../company.module.css';

export function WhoWeAreSection() {
  const capabilities = [
    'Production',
    'Brand & strategy',
    'Web development',
    'App development',
    'Digital services',
    'Events & experiences',
    'Agentic AI',
  ];

  return (
    <section className={`${styles.statement} ${styles.integrated}`} id="who-we-are" aria-labelledby="who-title">
      <p className={styles.kicker}>INTEGRATED BUSINESS SOLUTIONS</p>
      <h2 id="who-title">WHO<br />WE ARE</h2>
      <div className={styles.aboutCopy}>
        <p className={styles.lead}>We are a 360° creative, technology, and business solutions agency that transforms ideas into impactful brands and scalable businesses.</p>
        <p>By combining strategy, design, marketing, technology, AI, media production, and event management, we deliver end-to-end solutions that help organizations launch, grow, and lead in an ever-evolving digital world.</p>
        <p>Our focus is simple: create measurable value through innovation, creativity, and execution excellence.</p>
      </div>
      <ul className={styles.capabilities} aria-label="Our capabilities">
        {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
      </ul>
      <a className={styles.companyCta} href="#enquiry">BUILD A BETTER SOLUTION ↗</a>
    </section>
  );
}
