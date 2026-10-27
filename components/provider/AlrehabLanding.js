import Head from 'next/head';
import Link from 'next/link';
import { fetchTaxonomyTable } from '../../lib/platformDirectoryCards';
import styles from './AlrehabLanding.module.css';

const slug = 'alrehab-home-clean';
const code = 'BR-2000029';

export async function getServerSideProps({ resolvedUrl, res }) {
  const en = resolvedUrl.startsWith('/en/');
  // Fetch only a published, verified platform profile using the public client.
  // Failure is explicit: never replace unavailable data with a hard-coded profile.
  res.setHeader('Cache-Control', 'private, no-store');
  try {
    const profiles = await fetchTaxonomyTable(
      'provider_public_profiles?select=id,slug,public_provider_code,name_ar,name_en,short_description_ar,short_description_en,description_ar,description_en,phone,whatsapp,logo_url,cover_image_url,landing_page_status,verification_status&public_provider_code=eq.BR-2000029&slug=eq.alrehab-home-clean&landing_page_status=eq.published&verification_status=eq.verified'
    );
    const profile = profiles[0];
    if (!profile) return { notFound: true };
    const [services, locations, emirates, faqs] = await Promise.all([
      fetchTaxonomyTable('provider_services?select=id,title_ar,title_en,description_ar,description_en,image_url,is_published,display_order&provider_id=eq.' + profile.id + '&is_published=eq.true&order=display_order.asc'),
      fetchTaxonomyTable('provider_service_locations?select=emirate_id,coverage_type,is_active&provider_id=eq.' + profile.id + '&is_active=eq.true'),
      fetchTaxonomyTable('platform_emirates?select=id,name_ar,name_en'),
      fetchTaxonomyTable('provider_faqs?select=id,question_ar,question_en,answer_ar,answer_en&provider_id=eq.' + profile.id + '&is_published=eq.true&order=display_order.asc'),
    ]);
    return { props: { en, profile, services, locations, emirates, faqs } };
  } catch (error) {
    console.error('Alrehab public profile unavailable:', error.message);
    res.statusCode = 503;
    return { props: { en, unavailable: true } };
  }
}

export default function AlrehabLanding({ en, unavailable, profile, services = [], locations = [], emirates = [], faqs = [] }) {
  const t = (ar, english) => en ? english : ar;
  const path = '/providers/' + slug;
  const canonical = 'https://bietalreef.ae' + (en ? '/en' : '') + path;
  if (unavailable) return <main className={styles.wrap}><h1>{t('الصفحة غير متاحة مؤقتًا','Page temporarily unavailable')}</h1></main>;
  const name = en ? profile.name_en : profile.name_ar;
  const phone = String(profile.phone || '').replace(/[^0-9+]/g, '');
  const rawWa = String(profile.whatsapp || '').replace(/\D/g, '');
  const whatsapp = rawWa.startsWith('0') ? '971' + rawWa.slice(1) : rawWa;
  const coverage = locations.map(row => emirates.find(e => e.id === row.emirate_id)).filter(Boolean);
  return <>
    <Head>
      <title>{name} | {t('بيت الريف','Biet Al Reef')}</title>
      <meta name="description" content={(en ? profile.short_description_en : profile.short_description_ar) || name} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar-AE" href={'https://bietalreef.ae' + path} />
      <link rel="alternate" hrefLang="en-AE" href={'https://bietalreef.ae/en' + path} />
      <link rel="alternate" hrefLang="x-default" href={'https://bietalreef.ae' + path} />
    </Head>
    <main className={styles.wrap} lang={en ? 'en' : 'ar'} dir={en ? 'ltr' : 'rtl'}>
      <nav className={styles.top}><Link href={en ? '/en' : '/'}>{t('بيت الريف','Biet Al Reef')}</Link><Link href={(en ? '' : '/en') + path}>{en ? 'العربية' : 'English'}</Link></nav>
      <header className={styles.hero}>
        {profile.cover_image_url && <img className={styles.cover} src={profile.cover_image_url} alt="" />}
        <div className={styles.heroContent}>
          {profile.logo_url && <img className={styles.logo} src={profile.logo_url} alt={name} />}
          <p className={styles.eyebrow}>{t('شركة موثقة','Verified business')}</p><h1>{name}</h1>
          <p>{en ? profile.short_description_en : profile.short_description_ar}</p>
          <div className={styles.actions}>{phone && <a href={'tel:' + phone}>{t('اتصل الآن','Call now')}</a>}{whatsapp && <a href={'https://wa.me/' + whatsapp}>{t('واتساب','WhatsApp')}</a>}</div>
        </div>
      </header>
      <nav className={styles.jump} aria-label={t('أقسام الصفحة','Page sections')}>
        <a href="#about">{t('عن الشركة','About')}</a><a href="#services">{t('الخدمات','Services')}</a><a href="#coverage">{t('مناطق الخدمة','Service areas')}</a>{faqs.length > 0 && <a href="#faq">{t('الأسئلة الشائعة','FAQs')}</a>}
      </nav>
      <section id="about" className={styles.section}><h2>{t('عن الرحاب هوم كلين','About Al Rehab Home Clean')}</h2><p>{en ? profile.description_en : profile.description_ar}</p></section>
      <section id="services" className={styles.section}><h2>{t('الخدمات','Services')}</h2>{services.length ? <div className={styles.grid}>{services.map(s => <article className={styles.card} key={s.id}>{s.image_url && <img src={s.image_url} alt="" loading="lazy" />}<h3>{en ? s.title_en : s.title_ar}</h3><p>{en ? s.description_en : s.description_ar}</p></article>)}</div> : <p>{t('تُعرض الخدمات بعد اعتمادها للنشر.','Services appear once approved for publication.')}</p>}</section>
      {coverage.length > 0 && <section id="coverage" className={styles.section}><h2>{t('مناطق الخدمة','Service areas')}</h2><ul className={styles.areas}>{coverage.map((area, index) => <li key={area.id + '-' + index}>{en ? area.name_en : area.name_ar}</li>)}</ul></section>}
      {faqs.length > 0 && <section id="faq" className={styles.section}><h2>{t('الأسئلة الشائعة','Frequently asked questions')}</h2>{faqs.map(f => <details key={f.id}><summary>{en ? f.question_en : f.question_ar}</summary><p>{en ? f.answer_en : f.answer_ar}</p></details>)}</section>}
    </main>
  </>;
}
