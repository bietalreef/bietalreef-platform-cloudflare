import Image from 'next/image';
import { Globe2 } from 'lucide-react';
import { GOOGLE_PLAY_URL, MARKET_URL, PROVIDERS_APP_URL } from '../lib/platformUrls';
import styles from './PlatformAccessActions.module.css';

export default function PlatformAccessActions({ locale = 'ar', compact = false, className = '' }) {
  const en = locale === 'en';
  const actions = [
    { href: GOOGLE_PLAY_URL, label: 'Android', title: en ? 'Download Biet Al Reef from Google Play' : 'حمّل تطبيق بيت الريف من Google Play', badge: true, external: true },
    { href: PROVIDERS_APP_URL, label: en ? 'Web app' : 'المتصفح', title: en ? 'Open the Biet Al Reef web app' : 'افتح تطبيق بيت الريف من المتصفح' },
    { href: MARKET_URL, label: en ? 'Market' : 'السوق', title: en ? 'Open Biet Al Reef Market' : 'افتح سوق بيت الريف', image: '/images/gateway/materials-products-gateway.webp' },
  ];
  return <div className={`${styles.row} ${compact ? styles.compact : ''} ${className}`} data-platform-access-actions>
    {actions.map(action => <a key={action.href} href={action.href} aria-label={action.title} title={action.title} target={action.external ? '_blank' : undefined} rel={action.external ? 'noopener noreferrer' : undefined}>
      <span className={action.badge ? `${styles.mark} ${styles.markBadge}` : styles.mark}>{action.badge ? <img src={en ? 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' : 'https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png'} alt="Google Play" width="120" height="46" loading="lazy" decoding="async" className="h-auto w-[116px] object-contain" /> : action.image ? <Image src={action.image} alt="" width={32} height={32} /> : <Globe2 aria-hidden="true" />}</span><span>{action.label}</span>
    </a>)}
  </div>;
}
