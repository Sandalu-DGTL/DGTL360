import Link from 'next/link';
import styles from './site-footer.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.topline}>
        <strong>DGTL <span>360</span></strong>
        <p>COLOMBO + ANYWHERE</p>
      </div>
      <div className={styles.cta}>
        <p>HAVE A PROBLEM WORTH SOLVING?</p>
        <div>
          <h2>Let’s make the<br />next thing work.</h2>
          <a href="mailto:hello@dgtl.lk">hello@dgtl.lk ↗</a>
        </div>
      </div>
      <div className={styles.links}>
        <nav aria-label="Footer navigation">
          <Link href="/services/production">Services</Link>
          <a href="#who-we-are">Integrated solutions</a>
          <a href="#our-attitude">Our attitude</a>
          <a href="#team">Team</a>
        </nav>
        <p>Brand, content, product, growth and the systems underneath—one accountable Colombo crew.</p>
      </div>
      <div className={styles.legal}>
        <span>© DGTL 360</span>
        <span>COLOMBO, SRI LANKA</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
