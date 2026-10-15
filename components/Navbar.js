'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Home,
  MapPin,
  UserRound,
  Wrench,
  ShoppingBag,
  Bot,
  Menu,
  X,
  Rocket,
  Building2,
  ChevronDown,
  ChevronUp,
  Globe2
} from 'lucide-react';
import PlatformAccessActions from './PlatformAccessActions';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../data/siteTaxonomy';
import styles from './Navbar.module.css';
import { MARKET_URL } from '../lib/platformUrls';

const primaryLinks = [
  { href: '/', label: 'الرئيسية', labelEn: 'Home', icon: Home },
  { href: '/uae', label: 'دليل الإمارات', labelEn: 'UAE Directory', icon: MapPin },
  { href: '/providers', label: 'دليل الشركات والمهنيين', labelEn: 'Businesses & Professionals', icon: UserRound },
  { href: '/services', label: 'الخدمات والعروض', labelEn: 'Services & Offers', icon: Wrench },
  { href: MARKET_URL, label: 'سوق بيت الريف', labelEn: 'Biet Al Reef Market', icon: ShoppingBag }
];

const platformLinks = [
  { href: '/how-it-works', label: 'تعرّف على المنصة', labelEn: 'How it works', icon: Rocket },
  { href: '/weyaak', label: 'وياك AI', labelEn: 'Weyaak AI', icon: Bot }
];

const companyLinks = [
  { href: '/about', label: 'عن بيت الريف', labelEn: 'About Biet Al Reef', icon: Building2 },
  { href: '/why-biet-alreef', label: 'لماذا بيت الريف', labelEn: 'Why Biet Al Reef', icon: Building2 }
];

function isActivePath(pathname, href) {
  if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return false;
  const cleanHref = href.split('?')[0];
  if (cleanHref === '/' || cleanHref === '/en') return pathname === cleanHref;
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

export { getLocalizedPath } from '../lib/navigation';
import { getLocalizedPath } from '../lib/navigation';

function DrawerLink({ href, label, icon: Icon, active, onClick, nested = false, textDir = 'rtl' }) {
  const external = href?.startsWith('http');
  const content = <><Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-primary/90'}`} /><span dir={textDir}>{label}</span></>;
  const className = `flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-semibold transition ${active ? 'bg-primary/8 text-primary' : 'text-gray-800 hover:bg-primary/5 hover:text-primary'} ${nested ? 'ms-8' : ''}`;
  if (external) return <a href={href} onClick={onClick} aria-current={active ? 'page' : undefined} className={className}>{content}</a>;
  return <Link href={href} onClick={onClick} aria-current={active ? 'page' : undefined} className={className}>{content}</Link>;
}

function DrawerSection({ title, href, onNavigate, icon: Icon, open, onToggle, children, textDir = 'rtl' }) {
  return (
    <div className="border-t border-gray-100 pt-3">
      <div className="flex items-center">
        <Link href={href} onClick={onNavigate} className="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-bold text-gray-800 hover:bg-primary/5"><Icon className="h-5 w-5 shrink-0 text-primary" /><span dir={textDir}>{title}</span></Link>
        <button type="button" onClick={onToggle} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary hover:bg-primary/5" aria-expanded={open} aria-label={textDir === 'ltr' ? `Toggle ${title}` : `أقسام ${title}`}><ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} /></button>
      </div>
      <div hidden={!open} className="mt-1 space-y-1 pb-2">{children}</div>
    </div>
  );
}

function LanguageSwitch({ href, mobile = false, onClick, label = 'EN', ariaLabel = 'English version' }) {
  return (
    <Link href={href} onClick={onClick} className={`${mobile ? 'h-11 px-2.5 text-[11px]' : 'min-h-[36px] px-3 py-1.5 text-xs'} inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E6DCC8] bg-white font-black text-primary shadow-sm transition hover:border-primary`} aria-label={ariaLabel}>
      <span>{label}</span><Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

export default function Navbar({ locale = 'ar' }) {
  const router = useRouter();
  const isEnglish = locale === 'en';
  const textDir = isEnglish ? 'ltr' : 'rtl';
  const [isOpen, setIsOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const languageHref = getLocalizedPath(router.asPath || router.pathname || '/', isEnglish ? 'ar' : 'en');
  const prefix = isEnglish ? '/en' : '';
  const localize = (items) => items.map((item) => ({
    ...item,
    href: item.href.startsWith('http') ? item.href : (`${prefix}${item.href === '/' ? '' : item.href}` || '/'),
    label: isEnglish ? (item.labelEn || item.label) : item.label,
  }));
  const localizedPrimaryLinks = localize(primaryLinks);
  const localizedPlatformLinks = localize(platformLinks);
  const localizedCompanyLinks = localize(companyLinks);
  const closeMenu = () => setIsOpen(false);
  const menuButton = useRef(null);
  const drawer = useRef(null);
  const [expanded, setExpanded] = useState({});
  const currentPath = (router.asPath || '/').split(/[?#]/)[0];
  // Use the existing taxonomy and routes; do not download a second directory.
  const childrenFor = (href) => {
    if (href === `${prefix}/uae`) return UAE_EMIRATES.map((entry) => ({ href: `${prefix}/uae/${entry.slug}`, label: isEnglish ? entry.nameEn : entry.nameAr, icon: MapPin }));
    if (href === `${prefix}/services`) return SERVICE_CATEGORIES.map((entry) => ({ href: `${prefix}${isEnglish ? '/categories/' : '/services/'}${entry.slug}`, label: isEnglish ? entry.nameEn : entry.nameAr, icon: Wrench }));
    return [];
  };
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const background = [];
    let branch = drawer.current?.parentElement;
    while (branch && branch !== document.body) {
      for (const sibling of branch.parentElement?.children || []) {
        if (sibling !== branch && sibling instanceof HTMLElement && !['SCRIPT', 'STYLE', 'LINK'].includes(sibling.tagName)) background.push(sibling);
      }
      branch = branch.parentElement;
    }
    const inertValues = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => drawer.current?.querySelector('button')?.focus({ preventScroll: true }));
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); setIsOpen(false); }
      if (event.key !== 'Tab') return;
      const elements = [...drawer.current.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter((element) => element.getClientRects().length);
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const onNavigation = () => setIsOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', onNavigation);
    router.events.on('routeChangeStart', onNavigation);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = inertValues[index]; });
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onNavigation);
      router.events.off('routeChangeStart', onNavigation);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen, router.events]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur" dir="rtl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4" dir="rtl">
          <div className="flex min-w-0 items-center gap-2" dir="rtl">
          <button ref={menuButton} type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="platform-navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" aria-label={isEnglish ? 'Open menu' : 'فتح القائمة'}><Menu className="h-6 w-6" /></button>
          <Link href={isEnglish ? '/en' : '/'} className="flex min-w-0 items-center gap-2">
            <div className="relative h-11 w-11"><Image src="/icons/logo-512.webp" alt={isEnglish ? 'Biet Al Reef' : 'بيت الريف'} width={44} height={44} className="h-full w-full object-contain" loading="eager" /></div>
            <div className="flex min-w-0 flex-col" dir={textDir}><span className="text-sm font-bold text-primary">{isEnglish ? 'Biet Al Reef' : 'بيت الريف'}</span><span className="hidden text-xs text-gray-500 min-[360px]:block">{isEnglish ? 'Smart building platform' : 'منصة البناء الذكية'}</span></div>
          </Link>

          </div>
          <div className="flex shrink-0 items-center gap-2" dir="rtl">
            <LanguageSwitch href={languageHref} mobile label={isEnglish ? 'AR' : 'EN'} ariaLabel={isEnglish ? 'النسخة العربية' : 'English version'} />

          </div>
        </nav>
      </header>
      <div className="h-[65px] w-full" aria-hidden="true" />

      <div className={`${styles.layer} ${isOpen ? styles.open : ''}`} aria-hidden={!isOpen} dir="rtl">
          <button type="button" aria-label={isEnglish ? 'Close menu' : 'إغلاق القائمة'} onClick={closeMenu} tabIndex={-1} className={`${styles.backdrop} absolute inset-0 bg-black/35 backdrop-blur-[2px]`} />
          <aside ref={drawer} id="platform-navigation" role="dialog" aria-modal="true" aria-label={isEnglish ? 'Main navigation' : 'القائمة الرئيسية'} className={`${styles.drawer} absolute bottom-0 right-0 top-0 flex w-[88vw] max-w-[410px] flex-col rounded-l-[28px] bg-white shadow-2xl`} dir={textDir}>
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <button type="button" onClick={closeMenu} className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100" aria-label={isEnglish ? 'Close menu' : 'إغلاق القائمة'}><X className="h-6 w-6" /></button>
              <Image src="/icons/logo-512.webp" alt={isEnglish ? 'Biet Al Reef' : 'بيت الريف'} width={72} height={72} className="h-16 w-16 object-contain" />
              <span className="h-10 w-10" />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <nav aria-label={isEnglish ? 'Sections' : 'الأقسام'} className="space-y-1">{localizedPrimaryLinks.map((item, index) => {
                const children = childrenFor(item.href);
                const panelId = `navigation-section-${index}`;
                return <div key={item.href}>
                  <div className="flex items-center"><div className="min-w-0 flex-1"><DrawerLink {...item} textDir={textDir} active={isActivePath(currentPath, item.href)} onClick={closeMenu} /></div>
                  {children.length > 0 && <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary hover:bg-primary/5" aria-label={`${isEnglish ? 'Expand' : 'توسيع'} ${item.label}`} aria-controls={panelId} aria-expanded={Boolean(expanded[item.href])} onClick={() => setExpanded((value) => ({ ...value, [item.href]: !value[item.href] }))}><ChevronDown className={`h-5 w-5 transition-transform motion-reduce:transition-none ${expanded[item.href] ? 'rotate-180' : ''}`} /></button>}</div>
                  <div id={panelId} hidden={!expanded[item.href]}>{children.map((child) => <DrawerLink key={child.href} {...child} nested textDir={textDir} active={isActivePath(currentPath, child.href)} onClick={closeMenu} />)}</div>
                </div>;
              })}</nav>
              <div className="mt-5 space-y-3">
                <DrawerSection href={`${prefix}/how-it-works`} onNavigate={closeMenu} title={isEnglish ? 'Platform' : 'المنصة'} icon={Rocket} textDir={textDir} open={platformOpen} onToggle={() => setPlatformOpen((value) => !value)}>
                  {localizedPlatformLinks.map((item) => <DrawerLink key={item.href} {...item} nested textDir={textDir} active={isActivePath(currentPath, item.href)} onClick={closeMenu} />)}
                </DrawerSection>
                <DrawerSection href={`${prefix}/about`} onNavigate={closeMenu} title={isEnglish ? 'Biet Al Reef' : 'بيت الريف'} icon={Building2} textDir={textDir} open={companyOpen} onToggle={() => setCompanyOpen((value) => !value)}>
                  {localizedCompanyLinks.map((item) => <DrawerLink key={item.href} {...item} nested textDir={textDir} active={isActivePath(currentPath, item.href)} onClick={closeMenu} />)}
                </DrawerSection>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5 pb-[max(env(safe-area-inset-bottom),20px)]">
              <PlatformAccessActions locale={isEnglish ? 'en' : 'ar'} compact className="mb-3" />
              <Link href={`${prefix}/how-it-works`} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-center text-base font-black text-white shadow-lg" onClick={closeMenu}>{isEnglish ? 'Discover the platform' : 'تعرّف على المنصة'}<Rocket className="h-4 w-4" /></Link>
            </div>
          </aside>
        </div>
    </>
  );
}
