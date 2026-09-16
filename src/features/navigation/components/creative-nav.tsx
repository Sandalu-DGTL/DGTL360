import Link from 'next/link';
import { BrandLogo } from '@/components/layout/brand-logo';
import styles from '../navigation.module.css';

export function CreativeNav({ homepage = false }: { homepage?: boolean }) {
  return (
    <header className={`${styles.header} ${homepage ? styles.homepage : ''}`}>
      <a className={styles.brand} href={homepage ? '#top' : '/#top'} aria-label="DGTL 360 home">
        <BrandLogo />
      </a>
      <nav className={styles.links} aria-label="Primary navigation">
        <Link href="/services/production">SERVICES</Link>
        <a className={styles.enquire} href={homepage ? '#enquiry' : '/#enquiry'}>ENQUIRE <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
