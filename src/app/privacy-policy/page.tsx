import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../components/layout/site-footer';
import styles from './privacy-policy.module.css';

export const metadata: Metadata = { title: 'Privacy Policy', robots: { index: false, follow: true } };

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className={styles.page} id="top">
        <Link href="/">← DGTL 360</Link>
        <h1>Privacy Policy</h1>
        <p>DGTL Foundry Pvt Ltd</p>
        <h2>Privacy enquiries</h2>
        <p>Our full privacy policy will be available here. For information about how your personal information is handled, or to make a privacy-related request, contact <a href="mailto:info@dgtl.lk">info@dgtl.lk</a>.</p>
      </main>
      <SiteFooter />
    </>
  );
}
