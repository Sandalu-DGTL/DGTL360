import styles from '../company.module.css';

export function WhoWeAreSection() {
  return (
    <section className={styles.statement} id="who-we-are" aria-labelledby="who-title">
      <p className={styles.kicker}>INTEGRATED BUSINESS SOLUTIONS</p>
      <h2 id="who-title">
        One problem.<br />Several disciplines. One<br />accountable system.
      </h2>
      <p className={styles.body}>
        When the brief crosses brand, product, growth and operations, we build the
        connective tissue—not another handoff chain. The right disciplines arrive as
        one crew, with one route from sharp question to working outcome.
      </p>
    </section>
  );
}
