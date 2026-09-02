import type { CSSProperties } from 'react';
import styles from '../enquiry.module.css';

export function EnquirySection({ compact = false }: { compact?: boolean }) {
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
      <form
        className={styles.form}
        action="mailto:hello@dgtl.lk"
        method="post"
        encType="text/plain"
        data-service-reveal={compact ? '' : undefined}
        style={compact ? ({ '--reveal-delay': '220ms' } as CSSProperties) : undefined}
      >
        <label>
          <span>YOUR NAME *</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>YOUR EMAIL ADDRESS *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>COMPANY</span>
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          <span>PHONE</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className={styles.message}>
          <span>YOUR MESSAGE *</span>
          <textarea name="message" rows={compact ? 4 : 3} required />
        </label>
        <button type="submit">SEND ENQUIRY</button>
      </form>
      <a className={styles.email} href="mailto:hello@dgtl.lk">hello@dgtl.lk ↗</a>
      <address className={styles.address}>
        <span>OUR ADDRESS</span>
        Mode Residence<br />
        3 Beach Rd,<br />
        Dehiwala-Mount Lavinia
      </address>
    </section>
  );
}
