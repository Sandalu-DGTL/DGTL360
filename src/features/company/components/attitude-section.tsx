import styles from '../about.module.css';

export function AttitudeSection() {
  return (
    <section className={styles.aboutSection} id="our-attitude" aria-labelledby="attitude-title">
      <header className={styles.aboutHeader}>
      <p className={styles.kicker}>OUR ATTITUDE</p>
      <h2 id="attitude-title">Sharp thinking,<br />warm humans,<br />very little agency<br />theatre.</h2>
      </header>
      <div className={styles.aboutCopy}>
      <p>
        We ask the awkward question early, keep humans in charge and make the system
        earn its complexity. No loku scene.
      </p>
      </div>
    </section>
  );
}
