import BusinessCategoryIcon from '../BusinessCategoryIcon';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Search, MapPin, Building2, Wrench, ShoppingBag, Sparkles, ChevronDown, Smartphone, Globe2, Layers, FileCheck2 } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../data/siteTaxonomy';
import { MARKET_URL, PROVIDERS_APP_URL } from '../../lib/platformUrls';
import styles from './ProjectDiscovery.module.css';
import PlatformStoryVideo from '../PlatformStoryVideo';

const copy = {
  ar: {
    eyebrow: 'بيت الريف · البناء والأعمال في الإمارات', title: <>مشروعك يبدأ بفكرة.<br /><span>ونساعدك تكملها.</span></>,
    description: 'اكتشف الشركة أو المهني المناسب، والخدمات والمواد التي يحتاجها مشروعك. ابدأ من احتياجك، أو من المكان.',
    service: 'ابحث عن خدمة', city: 'اختر موقع الخدمة', searchLabel: 'ابحث داخل أقسام الخدمات', searchPlaceholder: 'ابحث عن قسم: تنظيف، صيانة، تصميم…',
    doors: 'طريق واضح لكل احتياج', doorsText: 'اختر وجهتك، وستجد التفاصيل في مكانها.', browse: 'استكشف',
    services: 'ما الخدمة التي تحتاجها؟', all: 'جميع الخدمات', noMatch: 'لا يوجد قسم مطابق. استعرض كل الخدمات أو جرّب كلمة أخرى.',
    places: 'ابدأ من المكان', placesText: 'الوصول إلى دليل الإمارة والمدن ومناطق الخدمة.',
    identity: 'نشاط واحد. هوية واحدة.', identityText: 'اسم نشاطك وصورك وخدماتك من حسابك الرسمي. يتغير أسلوب العرض حسب القناة، وتبقى الهوية مرتبطة بالأصل نفسه.',
    appTitle: 'التطبيق', appText: 'أنشئ بياناتك وعناصرك، وأدر أدواتك حسب اشتراكك.', marketTitle: 'السوق', marketText: 'تجربة لاكتشاف المنتجات والخدمات والعروض المعتمدة للقناة.', platformTitle: 'المنصة', platformText: 'حضور تفصيلي يربط نشاطك بتخصصك ومناطق خدمتك.',
    work: 'لصاحب النشاط', workTitle: 'ابنِ حضورك من حسابك.', workText: 'استكمل بياناتك، وفعّل أدوات باقتك، ثم أنشئ خدماتك ومنتجاتك وعروضك من التطبيق. ظهورها في السوق والمنصة يتبع صلاحية ومراجعة كل قناة.',
    openApp: 'افتح تطبيق الأعمال', editions: 'إصدارات التطبيق', weyaak: 'وياك، معك في الخطوة التالية.', weyaakText: 'وضّح احتياجك، وحدد التفاصيل، وابدأ المسار المناسب من تطبيق بيت الريف.', ask: 'افتح التطبيق وتحدث مع وياك',
    projectImage: 'عمارة إماراتية معاصرة — صورة تعريفية للمنصة وليست إعلان عقار', imageCaption: 'من الفكرة إلى المساحة التي تناسبك',
    locations: ['العين', 'أبوظبي', 'دبي'],
    gateways: ['دليل الإمارات', 'استعرض الشركات', 'الخدمات والعروض', 'سوق بيت الريف'],
    descriptions: ['المكان، ثم التخصص المناسب.', 'الشركة والمهني ونطاق العمل.', 'احتياجك، بالتفاصيل التي تهمك.', 'المنتجات والمواد في السوق العام.'],
  },
  en: {
    eyebrow: 'BIET AL REEF · BUILDING & BUSINESS IN THE UAE', title: <>Every project starts with an idea.<br /><span>Find your next step.</span></>,
    description: 'Discover businesses, professionals, services and materials for your project. Start with what you need, or where you need it.',
    service: 'Find a service', city: 'Choose a service location', searchLabel: 'Search service categories', searchPlaceholder: 'Search a category: cleaning, maintenance, design…',
    doors: 'A clear path for every need', doorsText: 'Choose a destination and explore its details.', browse: 'Explore',
    services: 'What service do you need?', all: 'All services', noMatch: 'No matching category. Explore all services or try another word.',
    places: 'Start with a place', placesText: 'Explore emirate directories, cities and service coverage.',
    identity: 'One business. One identity.', identityText: 'Your business name, images and services start from your official account. Each channel presents that same identity in its own context.',
    appTitle: 'App', appText: 'Create your information and items. Manage tools according to your subscription.', marketTitle: 'Marketplace', marketText: 'Discover products, services and offers approved for this channel.', platformTitle: 'Platform', platformText: 'A detailed presence connecting your business with specialties and service areas.',
    work: 'FOR BUSINESS OWNERS', workTitle: 'Build your presence from your account.', workText: 'Complete your information, activate your plan tools and create services, products and offers in the app. Marketplace and platform visibility follows each channel’s permissions and review.',
    openApp: 'Open the business app', editions: 'App editions', weyaak: 'Weyaak, for your next step.', weyaakText: 'Explain your needs, clarify the details and start the right journey in the Biet Al Reef app.', ask: 'Open the app and talk to Weyaak',
    projectImage: 'Contemporary UAE architecture — platform illustration, not a property listing', imageCaption: 'From your idea to a space that fits',
    locations: ['Al Ain', 'Abu Dhabi', 'Dubai'],
    gateways: ['UAE Directory', 'Explore businesses', 'Services & Offers', 'Biet Al Reef Market'],
    descriptions: ['A place, then the right specialty.', 'Businesses, professionals and coverage.', 'Your needs and the details that matter.', 'Products and materials in the public market.'],
  },
};

export default function ProjectDiscovery({ locale = 'ar' }) {
  const en = locale === 'en';
  const t = copy[en ? 'en' : 'ar'];
  const prefix = en ? '/en' : '';
  const Arrow = en ? ArrowRight : ArrowLeft;
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const term = query.trim().toLocaleLowerCase();
  const available = SERVICE_CATEGORIES.filter(item => !term || `${item.nameAr} ${item.nameEn}`.toLocaleLowerCase().includes(term));
  const visible = term || showAll ? available : available.slice(0, 6);
  const gateways = [
    { href: `${prefix}/uae`, icon: MapPin, image: '/images/gateway/uae-directory-gateway.webp' },
    { href: `${prefix}/providers`, icon: Building2, image: '/images/gateway/providers-gateway.webp' },
    { href: `${prefix}/services`, icon: Wrench, image: '/images/gateway/services-offers-gateway.webp' },
    { href: MARKET_URL, icon: ShoppingBag, image: '/images/gateway/materials-products-gateway.webp' },
  ];
  const locations = ['/uae/abu-dhabi/al-ain', '/uae/abu-dhabi', '/uae/dubai'];

  return <div className={styles.experience} dir={en ? 'ltr' : 'rtl'}>
    <section className={styles.hero} aria-labelledby="project-home-title">
      <div className={styles.heroCopy}><span className={styles.eyebrow}>{t.eyebrow}</span><h1 id="project-home-title">{t.title}</h1><p>{t.description}</p><div className={styles.actions}><Link className={styles.primary} href="#service-discovery"><Search aria-hidden="true" />{t.service}</Link><Link className={styles.secondary} href={`${prefix}/uae`}><MapPin aria-hidden="true" />{t.city}</Link></div><div className={styles.heroFoot}><span>01</span><span>{en ? 'Discover · Choose · Connect' : 'اكتشف · اختر · تواصل'}</span></div></div>
      <div className={styles.heroVisual}><picture><source media="(max-width: 760px)" srcSet="/cdn-cgi/image/width=660,quality=70,format=webp/images/bietalreef-option-one-villa.webp" /><img src="/cdn-cgi/image/width=1100,quality=74,format=webp/images/bietalreef-option-one-villa.webp" alt={t.projectImage} width="1100" height="685" fetchPriority="high" loading="eager" decoding="async" className={styles.heroImage} /></picture><div className={styles.visualCaption}><span>{t.imageCaption}</span><Arrow aria-hidden="true"/></div></div>
    </section>

    <section className={styles.section} aria-labelledby="gateways-title"><div className={styles.sectionHead}><div><span className={styles.eyebrow}>{en ? 'EXPLORE BIET AL REEF' : 'اكتشف بيت الريف'}</span><h2 id="gateways-title">{t.doors}</h2><p>{t.doorsText}</p></div></div><div className={styles.gateways}>{gateways.map((item,i)=>{const Icon=item.icon;return <Link key={item.href} href={item.href} className={styles.gateway}><div className={styles.gatewayVisual}><picture><source media="(max-width: 600px)" srcSet={`/cdn-cgi/image/width=440,quality=69,format=webp${item.image}`} /><img src={`/cdn-cgi/image/width=600,quality=70,format=webp${item.image}`} alt="" width="600" height="445" loading="lazy" decoding="async" fetchPriority="low" /></picture></div><div className={styles.gatewayBody}><Icon aria-hidden="true"/><h3>{t.gateways[i]}</h3><p>{t.descriptions[i]}</p><span>{t.browse}<Arrow aria-hidden="true"/></span></div></Link>;})}</div></section>

    <section id="service-discovery" className={`${styles.section} ${styles.serviceSection}`} aria-labelledby="service-title"><div className={styles.sectionHead}><div><span className={styles.eyebrow}>{en ? 'START WITH YOUR NEED' : 'ابدأ من احتياجك'}</span><h2 id="service-title">{t.services}</h2></div><Link href={`${prefix}/services`} className={styles.textLink}>{t.all}<Arrow aria-hidden="true"/></Link></div><label className={styles.categorySearch}><Search aria-hidden="true"/><span className="sr-only">{t.searchLabel}</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder={t.searchPlaceholder} type="search" maxLength={100}/></label><div className={styles.serviceGrid}>{visible.map((item,i)=>{return <Link key={item.slug} href={`${prefix}${en ? '/categories/' : '/services/'}${item.slug}`} className={styles.service}><span aria-hidden="true"><BusinessCategoryIcon category={item.slug} /></span><b>{en?item.nameEn:item.nameAr}</b><Arrow aria-hidden="true"/></Link>;})}</div>{!visible.length&&<p role="status" className={styles.empty}>{t.noMatch}</p>}{!term&&available.length>6&&<button type="button" aria-expanded={showAll} className={styles.showAll} onClick={()=>setShowAll(!showAll)}>{showAll?(en?'Show fewer':'عرض أقل'):t.all}<ChevronDown aria-hidden="true"/></button>}</section>

    <section className={`${styles.section} ${styles.places}`} aria-labelledby="places-title"><div><span className={styles.eyebrow}>{en ? 'NEAR YOUR PROJECT' : 'أقرب لمشروعك'}</span><h2 id="places-title">{t.places}</h2><p>{t.placesText}</p></div><div className={styles.locationLinks}>{locations.map((href,i)=><Link key={href} href={`${prefix}${href}`}><MapPin aria-hidden="true"/>{t.locations[i]}<Arrow aria-hidden="true"/></Link>)}</div></section>

    <section className={`${styles.section} ${styles.weyaak}`} aria-labelledby="home-weyaak-title"><div className={styles.weyaakMark}><Image src="/icons/logo-512.webp" alt="" width={62} height={62}/></div><div><span className={styles.eyebrow}>{en?'WEYAAK':'وياك'}</span><h2 id="home-weyaak-title">{t.weyaak}</h2><p>{t.weyaakText}</p></div><a className={styles.primary} href={PROVIDERS_APP_URL}>{t.ask}<Arrow aria-hidden="true"/></a></section>

    <section className={styles.section} aria-labelledby="identity-title"><div className={styles.sectionHead}><div><span className={styles.eyebrow}>{en?'CONNECTED CHANNELS':'قنوات مترابطة'}</span><h2 id="identity-title">{t.identity}</h2><p>{t.identityText}</p></div></div><div className={styles.channelGrid}>{[[Smartphone,t.appTitle,t.appText,`${prefix}/web-app`],[ShoppingBag,t.marketTitle,t.marketText,MARKET_URL],[Globe2,t.platformTitle,t.platformText,`${prefix}/how-it-works`]].map(([Icon,title,text,href])=><Link key={title} href={href} className={styles.channel}><Icon aria-hidden="true"/><h3>{title}</h3><p>{text}</p><Arrow aria-hidden="true"/></Link>)}</div></section>

    <PlatformStoryVideo locale={en ? 'en' : 'ar'} />

    <section className={`${styles.section} ${styles.owner}`} aria-labelledby="owner-title"><div><span className={styles.eyebrow}>{t.work}</span><h2 id="owner-title">{t.workTitle}</h2><p>{t.workText}</p></div><div className={styles.actions}><a className={styles.primary} href={PROVIDERS_APP_URL}>{t.openApp}<Arrow aria-hidden="true"/></a><Link className={styles.secondary} href={`${prefix}/app`}>{t.editions}<Smartphone aria-hidden="true"/></Link></div></section>
  </div>;
}
