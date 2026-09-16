import Link from 'next/link';
import type { CSSProperties } from 'react';
import { EnquiryForm } from './enquiry-form.client';
import styles from '../enquiry.module.css';

export function EnquirySection({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section className={`${styles.section} ${styles.compact} ${styles.splitContact}`} aria-label="Get in touch">
        <section className={styles.formPanel} aria-labelledby="service-form-title">
          <p className={styles.kicker}>START A CONVERSATION</p>
          <h2 id="service-form-title">Send an enquiry.</h2>
          <EnquiryForm compact />
        </section>
        <section className={styles.detailsPanel} aria-labelledby="service-enquiry-title">
          <p className={styles.kicker}>CONTACT DETAILS</p>
          <h2 id="service-enquiry-title">Let’s make your next move clear.</h2>
          <p className={styles.copy}>Tell us what you are building, what feels stuck, or where you need traction. We’ll route the right DGTL 360 crew and the next useful step.</p>
          <Link className={styles.email} href="/#enquiry">info@dgtl.lk ↗</Link>
          <address className={styles.address}>
            <span>VISIT US</span>
            Mode Residence,<br />
            3 Beach Rd,<br />
            Dehiwala-Mount Lavinia
          </address>
        </section>
      </section>
    );
  }

  return (
    <section className={`${styles.section} ${compact ? styles.compact : ''}`} id={compact ? undefined : 'enquiry'} aria-labelledby={compact ? 'service-enquiry-title' : 'enquiry-title'}>
      <p
        className={styles.kicker}
        data-service-reveal={compact ? '' : undefined}
        style={compact ? ({ '--reveal-delay': '0ms' } as CSSProperties) : undefined}
      >
        {compact ? 'CONTACT US' : 'START AN ENQUIRY'}
      </p>
      <h2
        id={compact ? 'service-enquiry-title' : 'enquiry-title'}
        data-service-reveal={compact ? '' : undefined}
        style={compact ? ({ '--reveal-delay': '80ms' } as CSSProperties) : undefined}
      >
        {compact ? 'Let’s make your next move clear.' : <>Tell us the problem. We’ll route the next useful step.</>}
      </h2>
      <p
        className={styles.copy}
        data-service-reveal={compact ? '' : undefined}
        style={compact ? ({ '--reveal-delay': '150ms' } as CSSProperties) : undefined}
      >
        {compact
          ? 'Tell us what you are building, what feels stuck, or where you need traction. We’ll route the right DGTL 360 crew and the next useful step.'
          : 'Tell us what you are trying to make, fix or move forward. We’ll bring in the right people, ask the useful questions and come back with a practical next step.'}
      </p>
      <EnquiryForm compact={compact} />
      <Link className={styles.email} href="/#enquiry">info@dgtl.lk ↗</Link>
      {compact ? (
        <address className={styles.address}>
          <span>OUR ADDRESS</span>
          Mode Residence,<br />
          3 Beach Rd,<br />
          Dehiwala-Mount Lavinia
        </address>
      ) : null}
    </section>
  );
}
