import Link from 'next/link';
import { useRouter } from 'next/router';
import { BadgeCheck, Building2, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getArea, getEmirate } from '../../data/siteTaxonomy';
import { AREAS } from '../../data/localServices';
import DirectoryReadingDialog from '../DirectoryReadingDialog';

const media = value => typeof value === 'string' && /^(\/|https:\/\/)/.test(value) && !/^https:\/\/drive\.google\.com\/uc\?/.test(value) ? value : null;
const digitsFor = value => {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.startsWith('0') ? '971' + digits.slice(1) : digits;
};

function pageLocation(path, item, en) {
  const parts = String(path || '').split(/[?#]/)[0].split('/').filter(Boolean);
  const index = parts.indexOf('uae');
  const emirate = index < 0 ? null : getEmirate(parts[index + 1]);
  if (!emirate) return item.area || item.city || '';
  const city = parts[index + 2];
  const district = emirate.slug === 'abu-dhabi' && city === 'al-ain'
    ? AREAS.find(area => area.slug === parts[index + 3])
    : null;
  const place = district || getArea(emirate.slug, city) || emirate;
  return en ? place.nameEn : place.nameAr;
}

function WhatsAppIcon() {
  return <span className="relative inline-flex" aria-hidden="true"><MessageCircle size={22}/><Phone size={11} className="absolute left-[5px] top-[5px]"/></span>;
}

export default function DirectoryCompanyCard({ item, locale, onAction, showReading = false }) {
  const router = useRouter();
  if (!item?.href) return null;
  const en = locale ? locale === 'en' : item.href.startsWith('/en/');
  const cover = media(item.coverImage), logo = media(item.logoImage);
  const location = item.location || pageLocation(router.asPath, item, en);
  const contact = String(item.whatsapp || '');
  const number = digitsFor(item.phone || (contact.startsWith('http') ? '' : contact));
  const waNumber = digitsFor(contact);
  const whatsapp = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(contact) ? contact : waNumber.length >= 9 && waNumber.length <= 15 ? `https://wa.me/${waNumber}?text=${encodeURIComponent(en ? `Hello ${item.name}, I would like to ask about your services.\nhttps://bietalreef.ae${item.href}` : `مرحبًا ${item.name}، أرغب بالاستفسار عن خدماتكم.\nhttps://bietalreef.ae${item.href}`)}` : null;
  const call = number.length >= 9 && number.length <= 15;
  const action = 'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  return <article data-directory-company={item.href.replace(/^\/en/, '')} data-provider-slug={item.href.split('/').filter(Boolean).pop()} dir={en ? 'ltr' : 'rtl'} className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e2d8c6] bg-white shadow-sm sm:rounded-3xl">
    <Link href={item.href} onClick={()=>onAction?.('provider_view_from_area')} className="block aspect-[16/7] w-full overflow-hidden bg-[#f3efe7]" aria-label={item.name}>
      {cover ? <img src={cover} alt={item.name} loading="lazy" decoding="async" className="h-full w-full object-contain"/> : <span className="flex h-full items-center justify-center text-[#ac8b52]"><Building2 size={44} aria-hidden="true"/></span>}
    </Link>
    <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#ece4d6] bg-white sm:h-14 sm:w-14">{logo ? <img src={logo} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain"/> : <Building2 className="text-[#ac8b52]" aria-hidden="true"/>}</div>
        <div className="min-w-0"><h3 className="text-sm font-extrabold leading-6 text-[#193b53] sm:text-base"><Link href={item.href} onClick={()=>onAction?.('provider_view_from_area')}>{item.name}</Link></h3>{item.verified && <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8a6931]"><BadgeCheck size={14} aria-hidden="true"/>{en ? 'Verified on Biet Al Reef' : 'موثّق في بيت الريف'}</span>}</div>
      </div>
      {item.summary && <p className="line-clamp-1 text-xs leading-6 text-slate-600 sm:text-sm">{item.summary}</p>}
      {location && <p className="flex items-center gap-1.5 text-xs leading-6 text-slate-600"><MapPin size={15} className="shrink-0 text-[#ac8b52]" aria-hidden="true"/>{location}</p>}
      <div className="mt-auto flex items-center gap-2 pt-1">
        {showReading && <DirectoryReadingDialog title={item.name} locale={en ? 'en' : 'ar'} triggerLabel={en ? `Read more about ${item.name}` : `المزيد عن ${item.name}`}>
          {item.summary && <p>{item.summary}</p>}
          {item.providerType && <p><strong>{en ? 'Business type: ' : 'نوع النشاط: '}</strong>{item.providerType}</p>}
          {location && <p><strong>{en ? 'Listed location: ' : 'الموقع المذكور: '}</strong>{location}</p>}
          {item.specialties?.length > 0 && <><h3>{en ? 'Listed specialties' : 'التخصصات المذكورة'}</h3><ul>{item.specialties.map(value => <li key={value}>{value}</li>)}</ul></>}
          {item.serviceLinks?.length > 0 && <><h3>{en ? 'Published services' : 'الخدمات المنشورة'}</h3><ul>{item.serviceLinks.map(service => <li key={service.href}>{service.name}</li>)}</ul></>}
          <p>{en ? 'Contact the business to confirm the scope, exact coverage and availability before booking.' : 'تواصل مع الجهة لتأكيد نطاق العمل وتغطية موقعك والموعد قبل الاتفاق.'}</p>
          <p><Link href={item.href}>{en ? 'Explore the business profile' : 'استكشف ملف الجهة'}</Link></p>
        </DirectoryReadingDialog>}
        <Link href={item.href} onClick={()=>onAction?.('provider_view_from_area')} aria-label={en ? `View ${item.name}` : `عرض شركة ${item.name}`} title={en ? 'View profile' : 'عرض الملف'} className={`${action} min-w-0 flex-1 gap-2 border-[#193b53] bg-[#193b53] px-2 text-xs font-bold text-white sm:text-sm`}><Building2 size={18} aria-hidden="true"/><span>{showReading ? (en ? 'Explore' : 'استكشف') : (en ? 'View profile' : 'عرض الملف')}</span></Link>
        {call ? <a href={`tel:+${number}`} onClick={()=>onAction?.('phone_click')} aria-label={en ? `Call ${item.name}` : `اتصل بـ ${item.name}`} title={en ? 'Call' : 'اتصال'} className={`${action} border-[#c9dcf3] bg-[#edf5ff] text-[#1674d1]`}><Phone size={22} aria-hidden="true"/></a> : <span title={en ? 'Phone unavailable' : 'رقم الاتصال غير متاح'} aria-label={en ? 'Phone unavailable' : 'رقم الاتصال غير متاح'} className={`${action} border-slate-100 bg-slate-50 text-slate-300`}><Phone size={22} aria-hidden="true"/></span>}
        {whatsapp ? <a href={whatsapp} onClick={()=>onAction?.('whatsapp_click')} target="_blank" rel="noopener noreferrer" aria-label={en ? `WhatsApp ${item.name}` : `واتساب ${item.name}`} title="WhatsApp" className={`${action} border-[#b5e8c8] bg-[#e9f9ef] text-[#1da851]`}><WhatsAppIcon/></a> : <span title={en ? 'WhatsApp unavailable' : 'واتساب غير متاح'} aria-label={en ? 'WhatsApp unavailable' : 'واتساب غير متاح'} className={`${action} border-slate-100 bg-slate-50 text-slate-300`}><WhatsAppIcon/></span>}
      </div>
    </div>
  </article>;
}
