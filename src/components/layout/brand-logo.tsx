import Image from 'next/image';
import styles from './brand-logo.module.css';

export function BrandLogo({ sizes = '320px' }: { sizes?: string }) {
  return (
    <span className={styles.logo}>
      <Image src="/assets/brand/dgtl.png" alt="DGTL" width={1983} height={793} sizes={sizes} />
    </span>
  );
}
