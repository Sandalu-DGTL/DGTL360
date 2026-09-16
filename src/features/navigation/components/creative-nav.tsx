import Link from 'next/link';
import styles from '../navigation.module.css';

export function CreativeNav({ homepage = false }: { homepage?: boolean }) {
  return (
    <header className={`${styles.header} ${homepage ? styles.homepage : ''}`}>
      <a className={styles.brand} href="#top" aria-label="DGTL 360 home">
        <span>DGTL 360</span>
        <i aria-hidden="true"><b /><b /><b /></i>
      </a>
      <nav className={styles.links} aria-label="Primary navigation">
        <Link href="/services/production">SERVICES</Link>
        <a className={styles.enquire} href={homepage ? '#enquiry' : '/#enquiry'}>ENQUIRE <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
