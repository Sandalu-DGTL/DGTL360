import styles from '../navigation.module.css';

export function CreativeNav() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="DGTL 360 home">
        DGTL 360
      </a>
      <p className={styles.location}>COLOMBO + ANYWHERE</p>
      <nav className={styles.links} aria-label="Primary navigation">
        <a href="/services/production">SERVICES</a>
        <a href="#enquiry">SAY HELLO</a>
      </nav>
    </header>
  );
}
