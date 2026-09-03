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
        <p className={styles.lead}>We are a like-minded collective built around shared thinking, open process and a better standard of problem-solving—for Sri Lanka and the wider world.</p>
        <p>Our arsenal is deliberately broad, but our realm is digital. We work across production, brand and strategy, web and app development, digital services, events and experiences, and agentic AI—assembling the right disciplines around every brief.</p>
        <p>How we deliver is never fixed. We combine agentic models with experienced makers and technical advisors at every stage. The result is technology that strengthens human judgement and solutions built to move organisations and personal pursuits forward.</p>
      </div>
      <ul className={styles.capabilities} aria-label="Our capabilities">
        {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
      </ul>
      <a className={styles.companyCta} href="#enquiry">BUILD A BETTER SOLUTION ↗</a>
    </section>
  );
}
