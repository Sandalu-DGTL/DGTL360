import Link from 'next/link';
import styles from './site-footer.module.css';
import { SocialIcons } from './social-icons';

export function SiteFooter({ backToTop = '#top' }: { backToTop?: string }) {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.main}>
        <nav className={styles.links} aria-label="Footer navigation">
          <div>
            <Link href="/services/production">Services</Link>
            <Link href="/services/brand-strategy">Brand & strategy</Link>
            <Link href="/services/digital-marketing">Digital marketing</Link>
            <Link href="/services/web-platforms">Web development</Link>
          </div>
          <div>
            <Link href="/#who-we-are">About</Link>
            <Link href="/#our-attitude">Our attitude</Link>
            <Link href="/#team">Team</Link>
          </div>
          <div>
            <Link href="/#enquiry">Enquire</Link>
            <a href="mailto:info@dgtl.lk">Email us ↗</a>
          </div>
        </nav>
        <div className={styles.contact}>
          <SocialIcons />
          <Link href="/" className={styles.brand}>DGTL 360</Link>
          <p>Colombo + anywhere</p>
          <a href="mailto:info@dgtl.lk">info@dgtl.lk ↗</a>
        </div>
      </div>
      <div className={styles.legal}>
        <div className={styles.legalLinks}>
          <span>© 2025 - 2026 DGTL Foundry Pvt Ltd</span>
          <span aria-hidden="true">|</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        <a href={backToTop}>Back to top <span aria-hidden="true">⌃</span></a>
      </div>
    </footer>
  );
}
