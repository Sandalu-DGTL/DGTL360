import Link from 'next/link';
import styles from '../navigation.module.css';

export function CreativeNav({ homepage = false }: { homepage?: boolean }) {
  return (
    <header className={`${styles.header} ${homepage ? styles.homepage : ''}`}>
      <a className={styles.brand} href="#top" aria-label="DGTL 360 home">
        <span>DGTL 360</span>
        <i aria-hidden="true"><b /><b /><b /></i>
      </a>
      <p className={styles.location}>COLOMBO + ANYWHERE</p>
      <nav className={styles.links} aria-label="Primary navigation">
        <Link href="/services/production">SERVICES</Link>
        <a href="#enquiry">SAY HELLO</a>
      </nav>
    </header>
  );
}
