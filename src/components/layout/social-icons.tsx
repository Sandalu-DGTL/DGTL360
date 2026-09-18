import Image from 'next/image';
import styles from './site-footer.module.css';

// Keep this order aligned with the social links shown in the footer.
const socials: { name: string; color: string; href?: string; asset: string }[] = [
  { name: 'Facebook', color: '#1877f2', href: 'https://www.facebook.com/profile.php?id=61594186664260', asset: 'facebook' },
  { name: 'Instagram', color: '#ed008c', href: 'https://www.instagram.com/dgtl.lk/', asset: 'instagram' },
  { name: 'TikTok', color: '#fff', href: 'https://www.tiktok.com/@dgtl.lk', asset: 'tiktok' },
  { name: 'YouTube', color: '#fff', asset: 'youtube' },
  { name: 'LinkedIn', color: '#0088bc', href: 'https://www.linkedin.com/company/dgtl.lk/', asset: 'linkedin' },
  { name: 'WhatsApp', color: '#20ce67', href: 'https://wa.me/94764524670', asset: 'whatsapp' },
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
