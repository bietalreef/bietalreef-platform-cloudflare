import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, MapPin, MessageCircle, Phone } from 'lucide-react';

const media = value => typeof value === 'string' && /^(\/|https:\/\/)/.test(value) && !/^https:\/\/drive\.google\.com\/uc\?/.test(value) ? value : null;
const digitsFor = value => {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.startsWith('0') ? '971' + digits.slice(1) : digits;
};

export default function DirectoryCompanyCard({ item, locale }) {
  if (!item?.href) return null;
  const en = locale ? locale === 'en' : item.href.startsWith('/en/');
  const cover = media(item.coverImage), logo = media(item.logoImage);
  const location = [item.area, item.city].filter(Boolean).join(' · ');
  const contact = String(item.whatsapp || '');
  const number = digitsFor(item.phone || (contact.startsWith('http') ? '' : contact));
  const waNumber = digitsFor(contact);
  const whatsapp = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(contact) ? contact : waNumber.length >= 9 && waNumber.length <= 15 ? `https://wa.me/${waNumber}?text=${encodeURIComponent(en ? `Hello ${item.name}, I would like to ask about your services.\nhttps://bietalreef.ae${item.href}` : `مرحبًا ${item.name}، أرغب بالاستفسار عن خدماتكم.\nhttps://bietalreef.ae${item.href}`)}` : null;
  const services = item.serviceLinks || (item.specialties || []).slice(0, 4).map(name => ({ name }));
  return <article data-directory-company={item.href.replace(/^\/en/, '')} data-provider-slug={item.href.split('/').filter(Boolean).pop()} dir={en ? 'ltr' : 'rtl'} className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e2d8c6] bg-white shadow-sm sm:rounded-3xl">
    <Link href={item.href} className="block aspect-[16/7] overflow-hidden bg-[#f3efe7]" aria-label={item.name}>
      {cover ? <img src={cover} alt={item.name} loading="lazy" decoding="async" className="h-full w-full object-cover"/> : <span className="flex h-full items-center justify-center text-[#ac8b52]"><Building2 size={44} aria-hidden="true"/></span>}
    </Link>
    <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#ece4d6] bg-white">{logo ? <img src={logo} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain"/> : <Building2 className="text-[#ac8b52]" aria-hidden="true"/>}</div>
        <div className="min-w-0"><h3 className="text-lg font-extrabold leading-7 text-[#193b53]"><Link href={item.href}>{item.name}</Link></h3>{item.verified && <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#8a6931]"><BadgeCheck size={14}/>{en ? 'Verified on Biet Al Reef' : 'نشاط موثّق في بيت الريف'}</span>}</div>
      </div>
      {item.summary && <p className="line-clamp-2 text-sm leading-7 text-slate-600">{item.summary}</p>}
      {location && <p className="flex items-start gap-2 text-xs leading-6 text-slate-600"><MapPin size={15} className="mt-1 shrink-0 text-[#ac8b52]"/>{location}</p>}
      {services.length > 0 && <div className="flex flex-wrap gap-2">{services.map(service => service.href ? <Link key={service.href} href={service.href} className="rounded-lg border border-[#e6dcc8] bg-[#faf8f2] px-2.5 py-1.5 text-xs leading-5 text-[#665231]">{service.name}</Link> : <span key={service.name} className="rounded-lg border border-[#e6dcc8] bg-[#faf8f2] px-2.5 py-1.5 text-xs leading-5 text-[#665231]">{service.name}</span>)}</div>}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <Link href={item.href} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#193b53] px-3 py-2 text-sm font-bold text-white">{en ? 'View company' : 'عرض الشركة'}{en ? <ArrowRight size={16}/> : <ArrowLeft size={16}/>}</Link>
        {number.length >= 9 && number.length <= 15 && <a href={`tel:+${number}`} aria-label={en ? `Call ${item.name}` : `اتصل بـ ${item.name}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#d5bd8b] px-3 text-sm font-bold text-[#193b53]"><Phone size={16}/>{en ? 'Call' : 'اتصال'}</a>}
        {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={en ? `WhatsApp ${item.name}` : `واتساب ${item.name}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#d5bd8b] px-3 text-sm font-bold text-[#193b53]"><MessageCircle size={16}/>{en ? 'WhatsApp' : 'واتساب'}</a>}
      </div>
    </div>
  </article>;
}
