import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { House, MapPin, Building2, Wrench, Store, Search, ArrowRight, ArrowLeft, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/siteTaxonomy';
import BusinessCategoryIcon from './BusinessCategoryIcon';
import { isAppExperience } from '../lib/appExperience';
import { MARKET_URL } from '../lib/platformUrls';

export default function AppNavigation({ locale = 'ar' }) {
  const router = useRouter();
  const en = locale === 'en', prefix = en ? '/en' : '';
  const dialog = useRef(null), trigger = useRef(null);
  const [query, setQuery] = useState('');
  if (!isAppExperience(router.asPath)) return null;
  const path = (router.asPath || '/').split(/[?#]/)[0];
  const Back = en ? ArrowLeft : ArrowRight, Next = en ? ChevronRight : ChevronLeft;
  const links = [
    [House, prefix || '/', en ? 'Discover' : 'اكتشف'],
    [MapPin, `${prefix}/uae`, en ? 'Places' : 'الأماكن'],
    [Building2, `${prefix}/providers`, en ? 'Businesses' : 'الشركات'],
    [Wrench, `${prefix}/services`, en ? 'Services' : 'الخدمات'],
    [Store, MARKET_URL, en ? 'Market' : 'السوق'],
  ];
  const results = SERVICE_CATEGORIES.filter(item => !query.trim() || `${item.nameAr} ${item.nameEn}`.toLowerCase().includes(query.trim().toLowerCase()));
  const close = () => { dialog.current?.close(); trigger.current?.focus(); };
  const back = () => {
    if (window.history.state?.idx > 0) router.back();
    else void router.push(prefix || '/');
  };
  return <>
    <div className="br-app-tools-spacer" aria-hidden="true"/>
    <nav className="br-app-rail" aria-label={en ? 'Quick navigation' : 'التنقل السريع'} dir="rtl">
      <span className="br-rail-caption">{en ? 'EXPLORE' : 'اكتشف'}</span>
      {links.map(([Icon, href, label]) => <Link key={href} href={href} className="br-rail-link" aria-current={(href === prefix || href === '/' ? path === href : !href.startsWith('http') && (path === href || path.startsWith(href + '/'))) ? 'page' : undefined}><Icon aria-hidden="true"/><span dir={en ? 'ltr' : 'rtl'}>{label}</span></Link>)}
      <Link className="br-rail-quote" href={`${prefix}/request-quote`}><span>+</span><span>{en ? 'Get quote' : 'اطلب سعرًا'}</span></Link>
    </nav>
    <div className="br-app-tools" dir="rtl">
      <button type="button" className="br-tool-icon" onClick={back} aria-label={en ? 'Back' : 'رجوع'}><Back aria-hidden="true"/></button>
      <button ref={trigger} type="button" className="br-search-launcher" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog" aria-controls="br-app-search"><Search aria-hidden="true"/><span>{en ? 'What do you need?' : 'ماذا تحتاج لبيتك؟'}</span><kbd>⌕</kbd></button>
      <Link className="br-location-shortcut" href={`${prefix}/uae`} aria-label={en ? 'Choose a location' : 'اختر المكان'}><MapPin aria-hidden="true"/><span>{en ? 'UAE' : 'الإمارات'}</span></Link>
      <button type="button" className="br-tool-icon br-install-action" onClick={() => window.dispatchEvent(new CustomEvent('bietalreef:install'))} aria-label={en ? 'Add Biet Al Reef to your device' : 'أضف بيت الريف إلى جهازك'}><Download aria-hidden="true"/></button>
    </div>
    <dialog ref={dialog} id="br-app-search" className="br-search-dialog" aria-labelledby="br-search-title" dir={en ? 'ltr' : 'rtl'} onClick={event => { if (event.target === event.currentTarget) close(); }} onClose={() => trigger.current?.focus()}>
      <div className="br-search-top"><h2 id="br-search-title">{en ? 'Find your next service' : 'ابحث عن خدمتك'}</h2><button type="button" className="br-tool-icon" onClick={close} aria-label={en ? 'Close search' : 'إغلاق البحث'}><X aria-hidden="true"/></button></div>
      <label className="br-search-field"><Search aria-hidden="true"/><span className="sr-only">{en ? 'Search services' : 'ابحث عن خدمة'}</span><input autoFocus type="search" maxLength={100} value={query} onChange={event => setQuery(event.target.value)} placeholder={en ? 'Cleaning, maintenance, construction…' : 'تنظيف، صيانة، بناء…'}/></label>
      <div className="br-search-results">{results.map(item => <Link href={`${prefix}${en ? '/categories/' : '/services/'}${item.slug}`} key={item.slug} onClick={close}><span className="br-icon-tile"><BusinessCategoryIcon category={item.slug}/></span><span>{en ? item.nameEn : item.nameAr}</span><Next aria-hidden="true"/></Link>)}{!results.length && <p role="status">{en ? 'Try another service name, or search businesses below.' : 'جرّب اسم خدمة آخر، أو ابحث في الشركات أدناه.'}</p>}</div>
      <Link className="br-search-business" href={`${prefix}/providers${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`} onClick={close}><Building2 aria-hidden="true"/>{en ? 'Search businesses' : 'البحث في الشركات'}<Next aria-hidden="true"/></Link>
    </dialog>
  </>;
}
