import styles from '../company.module.css';

export function AttitudeSection() {
  return (
    <section className={`${styles.statement} ${styles.attitude}`} id="our-attitude" aria-labelledby="attitude-title">
      <p className={styles.kicker}>OUR ATTITUDE</p>
      <h2 id="attitude-title">Sharp thinking,<br />warm humans,<br />very little agency<br />theatre.</h2>
      <p className={styles.body}>
        We ask the awkward question early, keep humans in charge and make the system
        earn its complexity. No loku scene.
      </p>
    </section>
  );
}
