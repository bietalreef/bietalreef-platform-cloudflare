import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgePercent, Building2, MessageCircle } from 'lucide-react';
import CompactDescription from './CompactDescription';

// One responsive presentation for actual service, offer and product records.
export default function DiscoveryEntityCard({item,locale='ar',type='service'}) {
  if (!item) return null;
  const en=locale==='en', href=item.href||item.providerHref, image=item.image, Arrow=en?ArrowRight:ArrowLeft;
  if (!href) return null;
  const title=item.name||item.title||'', provider=item.providerName||'';
  const description=item.description||item.summary||item.providerSummary||'';
  const amount=Number(item.priceValue);
  return <article dir={en?'ltr':'rtl'} className="flex h-full min-w-0 flex-row overflow-hidden rounded-2xl border border-[#e2d8c6] bg-white shadow-sm sm:flex-col sm:rounded-3xl">
    <Link href={href} aria-label={title} className="relative block w-2/5 shrink-0 overflow-hidden bg-[#f3efe7] sm:aspect-[4/3] sm:w-full">
      {image?<picture>{item.imageMobile&&<source media="(max-width:700px)" srcSet={item.imageMobile}/>}<img src={image} alt={title} loading="lazy" decoding="async" width="1440" height="1080" className="absolute inset-0 h-full w-full object-contain"/></picture>:<span className="flex h-full items-center justify-center text-[#ac8b52]">{type==='offer'?<BadgePercent size={32}/>:<Building2 size={32}/>}</span>}
      {type==='offer'&&item.discountPercent>0&&<span className="absolute end-1 top-1 rounded-lg bg-white/95 px-2 py-1 text-xs font-extrabold text-[#24354B] sm:end-3 sm:top-3">{en?`${item.discountPercent}% OFF`:`خصم ${item.discountPercent}%`}</span>}
    </Link>
    <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-5">
      <span className="text-[10px] font-bold text-[#886b3e]">{type==='offer'?(en?'OFFER':'عرض'):type==='product'?(en?'PRODUCT':'منتج'):(en?'SERVICE':'خدمة')}</span>
      <h3 className="text-sm font-extrabold leading-6 text-[#193b53] sm:text-lg sm:leading-7"><Link href={href}>{title}</Link></h3>
      {description&&<CompactDescription text={description} locale={locale}/>}
      {type==='offer'&&item.offerCode&&<p className="text-xs font-bold text-[#185b87]">{en?'Offer code: ':'رمز العرض: '}<span dir="ltr">{item.offerCode}</span></p>}
      {item.imageIllustrative&&<small className="text-[10px] leading-4 text-slate-500">{en?'Illustrative image':'صورة توضيحية'}</small>}
      {item.photoAttribution?.author&&<small className="text-[10px] text-slate-500">{item.photoAttribution.author} · <a href={item.photoAttribution.source} target="_blank" rel="noreferrer" className="underline">{item.photoAttribution.license}</a></small>}
      {provider&&(item.providerHref?<Link href={item.providerHref} className="text-xs font-semibold text-[#806338]">{provider}</Link>:<span className="text-xs font-semibold text-[#806338]">{provider}</span>)}
      {type==='product'&&Number.isFinite(amount)&&amount>0&&<p className="text-sm font-bold text-[#24354B]">{en?'From':'من'} {amount.toLocaleString(en?'en-AE':'ar-AE')} {item.currency||'AED'}{item.priceUnit?` / ${item.priceUnit}`:''}</p>}
      {type==='product'&&Number.isFinite(amount)&&amount>0&&<p className="text-xs leading-5 text-slate-500">{en?'Confirm the final price after dimensions and specifications are reviewed.':'يؤكَّد السعر النهائي بعد مراجعة المقاسات والمواصفات.'}</p>}
      {type==='product'&&item.priceLabel&&<p className="text-xs text-slate-600">{item.priceLabel}</p>}
      {item.location&&<p className="text-xs text-slate-500">{item.location}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1"><Link href={href} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl bg-[#193b53] px-3 py-2 text-xs font-bold text-white">{type==='offer'?(en?'Offer details':'تفاصيل العرض'):type==='product'?(en?'Product details':'تفاصيل المنتج'):(en?'Service details':'تفاصيل الخدمة')}<Arrow size={14}/></Link>{type==='offer'&&item.linkedServiceHref&&<Link href={item.linkedServiceHref} className="px-1 text-xs font-bold text-[#806338] underline">{en?'Service scope':'نطاق الخدمة'}</Link>}{type!=='offer'&&(item.providerWhatsapp||item.whatsapp)&&<a href={item.providerWhatsapp||item.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-[#d5bd8b] px-3 text-xs font-bold text-[#193b53]"><MessageCircle size={14}/>{en?'WhatsApp':'واتساب'}</a>}</div>
    </div>
  </article>;
}
