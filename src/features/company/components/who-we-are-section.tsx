import styles from '../company.module.css';

export function WhoWeAreSection() {
  return (
    <section className={styles.statement} id="who-we-are" aria-labelledby="who-title">
      <p className={styles.kicker}>INTEGRATED BUSINESS SOLUTIONS</p>
      <h2 id="who-title">
        One problem.<br />Several disciplines. One<br />accountable system.
      </h2>
      <p className={styles.body}>
        We are a 360° creative, technology, and business solutions agency that
        transforms ideas into impactful brands and scalable businesses. By combining
        strategy, design, marketing, technology, AI, media production, and event
        management, we deliver end-to-end solutions that help organizations launch,
        grow, and lead in an ever-evolving digital world. Our focus is simple: create
        measurable value through innovation, creativity, and execution excellence.
      </p>
    </section>
  );
}
