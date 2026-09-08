import Image from 'next/image';
import styles from './site-footer.module.css';

// Add only verified DGTL profile URLs here. Unconfigured icons are not links.
const socials: { name: string; color: string; href?: string; asset: string }[] = [
  { name: 'Instagram', color: '#ed008c', asset: 'instagram' },
  { name: 'LinkedIn', color: '#0088bc', asset: 'linkedin' },
  { name: 'WhatsApp', color: '#20ce67', asset: 'whatsapp' },
  { name: 'YouTube', color: '#fff', asset: 'youtube' },
  { name: 'TikTok', color: '#fff', asset: 'tiktok' },
  { name: 'Slack', color: '#fff', asset: 'slack' },
  { name: 'Threads', color: '#090909', asset: 'threads' },
  { name: 'Telegram', color: '#22a6dc', asset: 'telegram' },
  { name: 'X', color: '#fff', asset: 'x' },
];

export function SocialIcons() {
  return (
    <ul className={styles.socials} aria-label="Social media">
      {socials.map(({ name, color, href, asset }) => {
        const graphic = <Image src={`/assets/social/${asset}.svg`} width={25} height={25} alt="" aria-hidden="true" unoptimized />;
        const style = { backgroundColor: color };
        return <li key={name}>{href ? (
          <a className={styles.socialIcon} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} style={style}>{graphic}</a>
        ) : (
          <span className={styles.socialIcon} role="img" aria-label={`${name} — profile link coming soon`} title={`${name} — profile link coming soon`} style={style}>{graphic}</span>
        )}</li>;
      })}
    </ul>
  );
}
