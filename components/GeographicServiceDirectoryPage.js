import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import GeographicServiceCards from './GeographicServiceCards';

export default function GeographicServiceDirectoryPage({model}) {
  const {item, cards, locale, path} = model;
  const en = locale === 'en';
  const place = item.placeName || (item.city ? (en ? 'Al Ain' : 'العين') : (en ? 'Abu Dhabi' : 'أبوظبي'));
  const prefix = en ? '/en' : '';
  const placePath = `${prefix}/uae/abu-dhabi${item.city ? '/al-ain' : ''}${item.area ? `/${item.area}` : ''}`;
  const title = en ? `${item.name} in ${place} | Biet Alreef` : `${item.name} في ${place} | بيت الريف`;
  const description = en ? `Explore ${item.name} in ${place} from published companies. Review the service and request a quotation.` : `اكتشف ${item.name} في ${place} من الشركات المنشورة، وراجع نطاق الخدمة واطلب عرض سعر يناسب احتياجك.`;
  const crumbs = [{name:en?'UAE directory':'دليل الإمارات',href:`${prefix}/uae`},{name:en?'Abu Dhabi':'أبوظبي',href:`${prefix}/uae/abu-dhabi`},...(item.city?[{name:place,href:placePath}]:[]),{name:en?'Services':'الخدمات',href:`${placePath}/${item.sector}`},{name:item.name,href:path}];
  return <><SEOHead title={title} description={description} canonicalPath={path} breadcrumbs={crumbs}/><div dir={en?'ltr':'rtl'} lang={locale} className="min-h-screen bg-[#f7f9fc]"><Navbar locale={locale}/><main>
    <section className="mx-auto max-w-6xl px-4 pt-7"><nav aria-label={en?'Breadcrumbs':'مسار التصفح'} className="mb-4 flex flex-wrap gap-2 text-xs text-slate-600">{crumbs.map((c,i)=><span key={`${c.href}-${i}`}>{i<crumbs.length-1?<Link href={c.href}>{c.name}</Link>:<span aria-current="page">{c.name}</span>}{i<crumbs.length-1?' / ':''}</span>)}</nav><h1 className="text-2xl font-black text-[#193b53] md:text-4xl">{item.name} {en?'in':'في'} {place}</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{item.description}</p></section>
    <GeographicServiceCards items={cards} locale={locale} place={place}/>
  </main><Footer locale={locale} showRequestCTA={false}/></div></>;
}
