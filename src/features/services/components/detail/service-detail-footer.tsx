import Link from 'next/link';
import styles from '../../service-detail.module.css';

export function ServiceDetailFooter() {
  return (
    <footer className={styles.detailFooter}>
      <Link href="/#top">← BACK TO ALL SERVICES</Link>
      <strong>DGTL 360</strong>
    </footer>
  );
}
