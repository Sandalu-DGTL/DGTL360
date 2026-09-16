import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../components/layout/site-footer';
import styles from './privacy-policy.module.css';
import { privacySections } from '../../content/local/privacy';

export const metadata: Metadata = { title: 'Privacy Policy', robots: { index: false, follow: true } };

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className={styles.page} id="top">
        <Link href="/">← DGTL 360</Link>
        <h1>Privacy Policy</h1>
        <p>Last updated: <time dateTime="2026-09-16">16 September 2026</time></p>
        <nav aria-label="Privacy policy contents" className={styles.contents}>
          <ol>{privacySections.map((section, index) => <li key={section.title}><a href={`#privacy-${index + 1}`}>{section.title}</a></li>)}</ol>
        </nav>
        {privacySections.map((section, index) => (
          <section key={section.title} id={`privacy-${index + 1}`} className={styles.policySection}>
            <h2>{index + 1}. {section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
