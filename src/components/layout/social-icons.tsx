import type { ReactNode } from 'react';
import styles from './site-footer.module.css';

// Add only verified DGTL profile URLs here. Unconfigured icons are not links.
const socials: { name: string; color: string; foreground: string; href?: string; icon: ReactNode }[] = [
  { name: 'Instagram', color: '#ed008c', foreground: '#fff', icon: <><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></> },
  { name: 'LinkedIn', color: '#0088bc', foreground: '#fff', icon: <><path d="M6 10v9M10 19v-9h4v2c2-4 6-2 6 1v6M14 12v7"/><circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none"/></> },
  { name: 'WhatsApp', color: '#20ce67', foreground: '#fff', icon: <><path d="M5 18 3 21l5-1a9 9 0 1 0-3-2Z"/><path d="m8 7-1 2c1 4 4 7 8 8l2-2-3-2-1 1c-2-1-3-2-3-3l1-1-3-3Z"/></> },
  { name: 'YouTube', color: '#fff', foreground: '#ff0033', icon: <><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" stroke="none"/><path d="m10 9 6 3-6 3Z" fill="white" stroke="none"/></> },
  { name: 'TikTok', color: '#fff', foreground: '#101014', icon: <><path d="M14 3v13a4 4 0 1 1-4-4M14 3c0 4 3 6 6 6" stroke="#25f4ee" strokeWidth="4" transform="translate(-1 0)"/><path d="M14 3v13a4 4 0 1 1-4-4M14 3c0 4 3 6 6 6" stroke="#fe2c55" strokeWidth="3" transform="translate(1 1)"/><path d="M14 3v13a4 4 0 1 1-4-4M14 3c0 4 3 6 6 6" strokeWidth="3"/></> },
  { name: 'Slack', color: '#fff', foreground: '#fff', icon: <><path d="M9 3v6M3 9h3" stroke="#36c5f0" strokeWidth="4"/><path d="M21 9h-6M15 3v3" stroke="#2eb67d" strokeWidth="4"/><path d="M15 21v-6M21 15h-3" stroke="#ecb22e" strokeWidth="4"/><path d="M3 15h6M9 21v-3" stroke="#e01e5a" strokeWidth="4"/></> },
  { name: 'Threads', color: '#090909', foreground: '#fff', icon: <path d="M19 7C17 1 5 1 4 11c-1 11 13 14 16 5 2-7-12-9-12-3 0 5 10 3 8-3-1-4-6-4-8-1"/> },
  { name: 'Telegram', color: '#22a6dc', foreground: '#fff', icon: <><path d="m3 11 18-7-4 16-6-5-4 3v-5Z" fill="currentColor" stroke="none"/><path d="m7 13 10-6-6 8" stroke="#22a6dc" strokeWidth="1"/></> },
  { name: 'X', color: '#fff', foreground: '#111', icon: <><path d="m5 4 12 16h3L8 4ZM5 20 19 4" strokeWidth="1.5"/></> },
];

export function SocialIcons() {
  return (
    <ul className={styles.socials} aria-label="Social media">
      {socials.map(({ name, color, foreground, href, icon }) => {
        const graphic = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>;
        const style = { backgroundColor: color, color: foreground };
        return <li key={name}>{href ? (
          <a className={styles.socialIcon} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} style={style}>{graphic}</a>
        ) : (
          <span className={styles.socialIcon} role="img" aria-label={`${name} — profile link coming soon`} title={`${name} — profile link coming soon`} style={style}>{graphic}</span>
        )}</li>;
      })}
    </ul>
  );
}
