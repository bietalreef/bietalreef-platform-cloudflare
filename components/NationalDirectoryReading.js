import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';
import { UAE_SECTOR_GUIDES_AR } from '../data/uaeSectorGuidesAr';
import { UAE_SECTOR_GUIDES_EN } from '../data/uaeSectorGuidesEn';

// One reviewed editorial source for /uae and /services. Unlike the directory
// modal, this is a permanent, server-rendered reading section for Googlebot
// and users with scripts disabled. No client-side fetch or hidden text injection.
const UI_NOTES = [
  /لا توجد مدونة جديدة أو أقسام منفصلة خارج الصفحة/,
  /لم أغيّر الموقع أو أنشر شيئًا/,
];
function relevantBlocks(sectorSlug, locale) {
  const blocks = (locale === 'en' ? UAE_SECTOR_GUIDES_EN : UAE_SECTOR_GUIDES_AR)[sectorSlug] || [];
  return blocks.filter(block => block?.text && !UI_NOTES.some(pattern => pattern.test(block.text)));
}

export default function NationalDirectoryReading({sector,locale='ar'}) {
  const en=locale==='en';
  const blocks=relevantBlocks(sector.slug,locale);
  if(!blocks.length)return null;
  const top=(en?'National guide: ':'الدليل الشامل: ')+sector.name[locale];
  // Navigational topics are derived from the actual rendered headings,
  // so every anchor refers to its own real explanatory content.
  const heads=blocks.map((block,i)=>block.type==='heading'?{title:block.text,id:'guide-topic-'+i}:null).filter(Boolean);
  const headingIds=new Map(heads.map(h=>[Number(h.id.slice('guide-topic-'.length)),h.id]));
  return <section id="directory-reading" dir={en?'ltr':'rtl'} className="mx-auto max-w-6xl px-3 py-8 sm:px-4" aria-labelledby="directory-reading-heading">
    <header className="mb-5">
      <p className="inline-flex items-center gap-2 text-xs font-bold text-[#185b87]"><BookOpen className="h-4 w-4 shrink-0" aria-hidden="true"/>{en?'Knowledge from the UAE directory':'من محتوى دليل الإمارات'}</p>
      <h2 id="directory-reading-heading" className="mt-2 text-xl font-extrabold leading-9 text-[#193b53] sm:text-3xl">{top}</h2>
      <p className="mt-2 max-w-4xl text-sm leading-8 text-slate-600">{en?'Understand the decisions, documents, checks and responsibilities relevant to this sector before choosing a company or requesting a quotation.':'اقرأ متطلبات التخصص وكيف تختار الجهة المناسبة وتراجع المخططات والمواصفات والعروض قبل التعاقد أو طلب السعر.'}</p>
    </header>
    {heads.length>1&&<nav className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5" aria-label={en?'Topics in this guide':'فهرس موضوعات الدليل'}>
      <h3 className="mb-3 text-sm font-extrabold text-[#193b53]">{en?'In this guide':'موضوعات الدليل'}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {heads.map(topic=><a key={topic.id} href={'#'+topic.id} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#f5f9fc] px-3 py-2 text-sm font-semibold leading-6 text-[#185b87] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600">{en?<ArrowUpRight className="h-4 w-4 shrink-0"/>:<ArrowUpLeft className="h-4 w-4 shrink-0"/>}{topic.title}</a>)}
      </div>
    </nav>}
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:rounded-3xl sm:px-7 sm:py-8">
      {blocks.map((block,i)=>{
        if(block.type==='heading')return <h3 key={i} id={headingIds.get(i)} className="mt-7 scroll-mt-32 border-b border-slate-200 pb-2 text-lg font-extrabold leading-8 text-[#193b53] first:mt-0 sm:text-xl">{block.text}</h3>;
        if(block.type==='subheading')return <h4 key={i} className="mt-5 text-base font-bold leading-8 text-[#193b53]">{block.text}</h4>;
        if(block.type==='link'){
          // Preserve original editorial citation URLs, not unrelated promotional links.
          if(!/^https:\/\//.test(block.href||''))return null;
          return <p key={i} className="mt-3"><a href={block.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 break-words text-sm font-semibold leading-7 text-[#185b87] underline underline-offset-2">{block.text}<ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true"/></a></p>;
        }
        return <p key={i} className="mt-3 text-sm leading-8 text-slate-700 sm:text-base sm:leading-9">{block.text}</p>;
      })}
    </div>
    <div className="mt-4 flex flex-wrap gap-3">
      <a href="#sector-specialties" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#185b87] px-4 py-2 text-sm font-bold text-[#185b87]">{en?'Browse the actual services':'تصفح الخدمات والتخصصات'}</a>
      <Link href={en?'/en/uae':'/uae'} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#185b87] px-4 py-2 text-sm font-bold text-white">{en?'Explore UAE locations':'استكشف دليل الإمارات'}</Link>
    </div>
  </section>;
}
