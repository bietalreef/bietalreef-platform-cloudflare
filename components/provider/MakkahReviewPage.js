import Head from 'next/head';
import Navbar from '../Navbar';
import Footer from '../Footer';
import draft from '../../data/providerTemplates/makkah-cleaning-visual-launch.draft.json';

const pathFor = (filename) => '/images/providers/makkah-cleaning/' + filename;
const copy = {
  ar: { title: 'شركة مكة لخدمات التنظيف', subtitle: 'تنظيف الفلل والمنازل والكنب والخزانات والمسابح والأحواش', services: 'الخدمات', offers: 'العروض المقترحة', areas: 'أماكن الخدمة', call: 'اتصل الآن', whatsapp: 'تواصل عبر واتساب', disclaimer: 'هذه معاينة غير منشورة. اسم النشاط والخدمات والعروض يحتاجون اعتمادًا قبل الإتاحة العامة أو الإعلانات.', more: 'الاستفسار عن الخدمة', discount: 'خصم 10%' },
  en: { title: 'Makkah Cleaning Services', subtitle: 'Villa, home, upholstery, tank, pool and courtyard cleaning', services: 'Services', offers: 'Proposed offers', areas: 'Service areas', call: 'Call now', whatsapp: 'WhatsApp', disclaimer: 'Unpublished preview. The business display name, services and offers require approval before public advertising.', more: 'Ask for details', discount: '10% off' },
};
export default function MakkahReviewPage({ locale = 'ar' }) {
  const en = locale === 'en'; const t = copy[locale] || copy.ar;
  const phone = 'tel:+971545575370'; const whatsapp = 'https://wa.me/971545575370';
  const services = draft.services; const offers = draft.offers;
  const name = item => en ? item.en : item.ar;
  return <>
    <Head><title>{t.title} | {en ? 'Biet Al Reef' : 'بيت الريف'} — {en ? 'Draft preview' : 'معاينة مسودة'}</title><meta name="robots" content="noindex,nofollow,noarchive" /></Head>
    <Navbar/>
    <main className="mk-container" dir={en ? 'ltr' : 'rtl'} lang={locale}>
      <nav className="mk-mini"><a href={en ? "/en/providers" : "/providers"}>{en ? 'Company directory' : 'دليل الشركات'}</a><a href={en ? '/preview/makkah-cleaning' : '/en/preview/makkah-cleaning'}>{en ? 'العربية' : 'English'}</a></nav>
      <section className="mk-hero">
        <div className="mk-photo"><img src={pathFor('photo-service-deep-villa-cleaning.webp')} alt={t.subtitle} onError={e=>{e.currentTarget.style.visibility='hidden'}} /></div>
        <div className="mk-copy"><span className="mk-tag">{en ? 'Draft review' : 'نسخة مراجعة'}</span><h1>{t.title}</h1><p>{t.subtitle}</p><div className="mk-tags">{(en ? ['Al Ain', 'Abu Dhabi', 'Dubai'] : ['العين','أبوظبي','دبي']).map(x=><span key={x}>⌖ {x}</span>)}</div><p className="mk-warning">{t.disclaimer}</p><div className="mk-buttons"><a href={phone}>{t.call}</a><a href={whatsapp} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></div></div>
      </section>
      <section id="services"><h2>{t.services}</h2><div className="mk-grid">{services.map(s=><article className="mk-item" key={s.slug}><div className="mk-thumb"><img loading="lazy" src={pathFor(s.file)} alt={name(s)} onError={e=>{e.currentTarget.style.visibility='hidden'}}/></div><div className="mk-item-copy"><h3>{name(s)}</h3><a href={`${en ? "/en" : ""}/preview/makkah-cleaning/services/${s.slug}`} className="mk-detail">{t.more} →</a></div></article>)}</div></section>
      <section id="offers"><h2>{t.offers}</h2><div className="mk-grid">{offers.map(o=><article className="mk-item" key={o.slug}><div className="mk-thumb"><img loading="lazy" src={pathFor(o.file)} alt={name(o)} onError={e=>{e.currentTarget.style.visibility='hidden'}}/><b className="mk-discount">{t.discount}</b></div><div className="mk-item-copy"><h3>{name(o)}</h3><a href={`${en ? "/en" : ""}/preview/makkah-cleaning/offers/${o.slug}`} className="mk-detail">{en ? 'Details (draft)' : 'التفاصيل (مسودة)'} →</a></div></article>)}</div></section>
      <section id="areas"><h2>{t.areas}</h2><div className="mk-tags">{(en ? ['Al Ain','Abu Dhabi','Dubai'] : ['العين','أبوظبي','دبي']).map(x=><span key={x}>⌖ {x}</span>)}</div></section>
    </main>
    <div className="mk-fixed"><a href={phone}>{t.call}</a><a href={whatsapp} rel="noopener noreferrer" target="_blank">{t.whatsapp}</a></div><Footer/>
    <style jsx>{`
      .mk-container{max-width:1100px;margin:auto;padding:18px 14px 120px;color:#133d29}.mk-mini{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#526b5b;margin-bottom:12px}.mk-hero{background:#fff;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;border:1px solid #e6dfd0;border-radius:20px}.mk-photo{background:linear-gradient(120deg,#e8efe1,#f9f6ee)}.mk-photo img{display:block;width:100%;height:310px;object-fit:cover}.mk-copy{padding:22px;align-self:center}.mk-copy h1{font-size:30px;margin:10px 0 6px}.mk-copy p{font-size:13px;color:#526b5b}.mk-tag{background:#f4eddb;color:#7b6425;font-size:11px;padding:5px 10px;border-radius:40px}.mk-warning{background:#fff8e5;padding:9px;border-radius:9px;font-size:11px!important;color:#8c7446!important}.mk-buttons{display:flex;gap:8px;margin-top:13px}.mk-buttons a,.mk-fixed a{padding:10px 16px;background:#133d29;color:white;border-radius:11px;font-size:12px;font-weight:700}.mk-buttons a+a,.mk-fixed a+a{background:#fff;color:#133d29;border:1px solid #cbb77b}.mk-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.mk-tags span{background:#f4f6f9;padding:5px 11px;border-radius:20px;font-size:12px}.mk-container section{margin-bottom:24px}.mk-container h2{font-size:21px;margin:21px 0 12px}.mk-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.mk-item{background:#fff;border:1px solid #e8ddcb;border-radius:14px;overflow:hidden}.mk-thumb{position:relative;height:175px;background:linear-gradient(140deg,#e6eadd,#f9f6ee)}.mk-thumb img{width:100%;height:100%;object-fit:cover}.mk-item-copy{padding:12px}.mk-item h3{margin:0 0 6px;font-size:14px}.mk-item-copy span{color:#826629;font-size:12px}.mk-detail{display:inline-flex;min-height:40px;align-items:center;text-decoration:underline;text-underline-offset:3px;font-weight:700}.mk-discount{position:absolute;top:8px;inset-inline-start:8px;background:white;padding:4px 10px;border-radius:30px;color:#8e6f30;font-size:12px}.mk-fixed{display:none}
      @media(max-width:760px){.mk-container{padding:8px 12px 110px}.mk-hero{display:flex;flex-direction:column;border-radius:15px}.mk-photo img{height:170px}.mk-copy{padding:13px}.mk-copy h1{font-size:22px;margin:8px 0 2px}.mk-copy p{font-size:12px;margin:4px 0}.mk-buttons{display:none}.mk-container h2{font-size:18px;margin:16px 0 9px}.mk-grid{grid-template-columns:1fr;gap:8px}.mk-item{display:grid;grid-template-columns:34% 66%;min-height:105px}.mk-thumb{height:120px}.mk-item-copy{align-self:center;padding:10px}.mk-item h3{font-size:13px}.mk-fixed{display:flex;position:fixed;bottom:0;left:0;right:0;gap:8px;padding:9px 12px calc(9px + env(safe-area-inset-bottom));background:white;border-top:1px solid #e8ddcb;z-index:30}.mk-fixed a{flex:1;text-align:center}}
    `}</style>
  </>;
}
