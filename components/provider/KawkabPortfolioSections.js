import Link from 'next/link';
import {
 KAWKAB_PROJECT, KAWKAB_SERVICE_COVERS, KAWKAB_PROFILE,
 kawkabProjectPath, kawkabPath, kawkabServicePath, kawkabWhatsapp
} from '../../lib/kawkabPresence';

const cap=(image,locale)=>image['image_title_'+locale]?.split('|')[0]?.trim()||image['alt_'+locale]||'';
const desc=(image,locale)=>image['caption_'+locale]||image['description_'+locale]||'';

export function KawkabProjectShowcase({locale='ar',compact=false}) {
 const en=locale==='en',p=KAWKAB_PROJECT,cover=p.images[0];
 return <section id="company-projects" className="mx-auto max-w-6xl px-3 py-5 md:px-4 md:py-10">
  <div className="mb-3 flex items-center justify-between gap-3 md:mb-5">
   <div><h2 className="text-lg font-extrabold text-[#272b36] md:text-2xl">{en?'Featured interior project':'مشروع التصميم الداخلي'}</h2>
   <p className="mt-1 hidden max-w-3xl text-sm leading-7 text-[#625a4f] md:block">{en?'Three related views, presented together as one project rather than separate project cards.':'ثلاث صور مترابطة لمشروع تصميم واحد، مجمعة في بطاقة واحدة لعرض التفاصيل والتشطيبات.'}</p></div>
   <Link href={kawkabProjectPath(locale)} className="shrink-0 text-xs font-bold text-[#785b38] underline md:text-sm">{en?'Open project':'تفاصيل المشروع'}</Link>
  </div>
  <article className="overflow-hidden rounded-2xl border border-[#e8dfd1] bg-white shadow-sm md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
   <Link href={kawkabProjectPath(locale)} className="block overflow-hidden bg-[#f4eee6]" aria-label={en?p.name_en:p.name_ar}>
     <img src={cover.url} alt={cover['alt_'+locale]} width={cover.width} height={cover.height} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover md:aspect-[4/3]"/>
   </Link>
   <div className="flex flex-col p-3 md:p-6">
    <h3 className="text-base font-bold text-[#283243] md:text-2xl">{en?p.name_en:p.name_ar}</h3>
    <p className="mt-1 line-clamp-1 text-xs text-[#635d54] md:mt-3 md:line-clamp-none md:text-sm md:leading-8">{en?p.description_en:p.description_ar}</p>
    <div className="mt-4 hidden grid-cols-2 gap-2 md:grid">{p.images.slice(1).map(image=><Link href={kawkabProjectPath(locale)} key={image.id} className="block overflow-hidden rounded-lg"><img src={image.url} alt={image['alt_'+locale]} width={image.width} height={image.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover"/></Link>)}</div>
    <Link href={kawkabProjectPath(locale)} className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#243b51] px-4 py-2 text-xs font-bold text-white md:mt-5 md:self-start md:text-sm">{en?'View all 3 photos and details':'عرض الصور الثلاث والتفاصيل'}</Link>
   </div>
  </article>
 </section>;
}

export function KawkabServiceCoverGallery({locale='ar',compact=false}) {
 const en=locale==='en';
 const shown=compact?KAWKAB_SERVICE_COVERS.slice(0,4):KAWKAB_SERVICE_COVERS;
 return <section id="company-service-covers" className="mx-auto max-w-6xl px-3 py-5 md:px-4 md:py-10">
  <div className="mb-3 flex items-center justify-between gap-3">
   <div><h2 className="text-lg font-extrabold text-[#26354a] md:text-2xl">{en?'Service cover gallery':'أغلفة الخدمات والتشطيبات'}</h2>
   <p className="mt-1 hidden text-sm leading-7 text-[#665c50] md:block">{en?'Browse individually titled finishing images, then open the relevant specialty or contact the company.':'كل صورة بعنوان دقيق يصف التشطيب الظاهر، مع رابط للتخصص المناسب أو للاستفسار المباشر من الشركة.'}</p></div>
   {compact&&<Link href={kawkabPath(locale,'gallery')} className="shrink-0 text-xs font-bold text-[#785b38] underline md:text-sm">{en?'All covers':'عرض الكل'}</Link>}
  </div>
  <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">{shown.map(image=>{
   const href=image.serviceId?kawkabServicePath(locale,image.serviceId):null;
   const img=<img src={image.url} alt={image['alt_'+locale]} width={image.width} height={image.height} loading="lazy" decoding="async" className="block aspect-[4/5] w-full object-cover transition-transform duration-300 hover:scale-[1.025] md:aspect-[4/3]"/>;
   return <article key={image.id} className="min-w-0 overflow-hidden rounded-xl border border-[#e7ded1] bg-white">
    <div className="overflow-hidden bg-[#efe8dc]">{href?<Link href={href} aria-label={cap(image,locale)}>{img}</Link>:<a href={kawkabWhatsapp(locale,cap(image,locale))} target="_blank" rel="noopener noreferrer" aria-label={cap(image,locale)}>{img}</a>}</div>
    <div className="p-2.5 md:p-4">
     <h3 className="line-clamp-2 min-h-[2.75rem] text-xs font-bold leading-5 md:min-h-0 md:text-base">{cap(image,locale)}</h3>
     <p className="mt-2 hidden text-sm leading-7 text-[#655b4f] md:block">{desc(image,locale)}</p>
     {href?<Link href={href} className="mt-2 block text-xs font-bold text-[#87643d] md:mt-3 md:text-sm">{en?'Explore service':'تفاصيل الخدمة'} ←</Link>:<a href={kawkabWhatsapp(locale,cap(image,locale))} className="mt-2 block text-xs font-bold text-[#87643d] md:mt-3 md:text-sm" target="_blank" rel="noopener noreferrer">{en?'Ask about this finish':'استفسر عن التشطيب'} ←</a>}
    </div>
   </article>;
  })}</div>
  {!compact&&<p className="mt-4 text-xs leading-6 text-[#655e54] md:text-sm">{en?'For pricing, describe your property, location, measurements and the finish you would like.':'لتحديد السعر: أرسل موقع العقار، والمقاسات، وحالة الأسطح، والصورة التي تناسب التشطيب المطلوب.'}</p>}
 </section>;
}
