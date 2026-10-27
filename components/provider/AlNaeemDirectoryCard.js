import Link from 'next/link';
import { Building2, MapPin, Phone, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { alNaeemPath } from '../../lib/alNaeemPresence';

export default function AlNaeemDirectoryCard({data,locale='ar'}) {
 if(!data?.profile)return null;
 const en=locale==='en';
 const name=data.profile['name_'+locale]||data.profile.name_ar;
 const description=data.profile['short_description_'+locale]||data.profile.short_description_ar;
 return <article dir={en?'ltr':'rtl'} className="group overflow-hidden rounded-[24px] border border-[#e6e5e0] bg-white shadow-[0_8px_26px_rgba(12,38,54,.07)]">
   <Link href={alNaeemPath(locale)} className="block overflow-hidden">
     <div className="relative aspect-[2.1/1] overflow-hidden bg-[#eaf0ee]">
       <img src={data.profile.cover_image_url} loading="lazy" alt={en?'Illustrative cleaning services photo':'صورة توضيحية لخدمات التنظيف'} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
       <span className="absolute end-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-[#19384e]">{en?'Cleaning services':'خدمات التنظيف'}</span>
     </div>
     <div className="space-y-2 p-5">
       <div className="flex items-center gap-2 text-[12px] text-[#b18d4b]"><Building2 size={15}/>{en?'Business listing':'بطاقة النشاط التجاري'}</div>
       <h3 className="text-[20px] font-extrabold leading-[1.5] text-[#183950]">{name}</h3>
       <p className="text-[14px] leading-6 text-[#5c6f7d]">{description}</p>
       <p className="flex items-center gap-2 text-[13px] text-[#697a87]"><MapPin size={15}/>{en?'Al Qusais, Dubai':'القصيص، دبي'}</p>
     </div>
   </Link>
   <div className="flex flex-wrap gap-2 px-5 pb-4">{data.services?.slice(0,4).map(s=><Link key={s.id} href={alNaeemPath(locale,{kind:'services',slug:s.slug})} className="rounded-full border border-[#dce1e2] bg-[#f9faf9] px-3 py-2 text-[12px] font-semibold text-[#28485a]">{s['name_'+locale]||s.name_ar}</Link>)}</div>
   <div className="flex gap-2 border-t border-[#e7e8e7] px-5 py-4">
      <Link href={alNaeemPath(locale)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#193d58] px-3 py-2 text-center text-[13px] font-bold text-white">{en?'View company pages':'عرض صفحات النعيم'}<ArrowLeft size={15} className={en?'rotate-180':''}/></Link>
      <a href="tel:+971522837071" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#cbb485] px-4 py-2 text-[13px] font-bold text-[#193d58]"><Phone size={15}/>{en?'Call':'اتصال'}</a>
   </div>
 </article>;
}
