import {ExternalLink, MapPin} from 'lucide-react';
import {portfolioMedia} from '../../lib/portfolioMedia.cjs';

function ProjectMedia({media, title, locale}) {
  const en = locale === 'en';
  if (!media) return null;
  if (media.kind === 'image') return <img src={media.url} alt={title} width="600" height="420" loading="lazy" className="h-52 w-full object-cover"/>;
  return <div className="bg-[#eaf2f8]">
    {media.embed ? <iframe title={title} src={media.embed} loading="lazy" className="h-[380px] w-full border-0 bg-white" allow="encrypted-media; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> : <p className="px-4 py-8 text-center text-sm text-[#153c5a]">{en?'Watch this video at its original source.':'شاهد الفيديو في مصدره الأصلي.'}</p>}
    <a href={media.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 border-t border-[#dbe5ee] px-3 text-xs font-semibold text-[#185b87] underline underline-offset-2">{en?'Open original video':'فتح الفيديو الأصلي'}<ExternalLink size={14}/></a>
  </div>;
}
export default function PublishedPortfolio({items=[],locale='ar'}) {
  const projects=items.filter(item=>item && typeof item.title==='string' && item.title.trim()).map(item=>({...item,media:(Array.isArray(item.media_items)?item.media_items:[]).map(portfolioMedia).filter(Boolean)}));
  if (!projects.length) return null;
  const en=locale==='en';
  const videos=projects.flatMap(project=>project.media.filter(media=>media.kind==='video'&&media.embed&&media.thumbnail&&media.uploadDate).map(media=>({'@type':'VideoObject',name:project.title,description:project.description||project.title,thumbnailUrl:media.thumbnail,uploadDate:media.uploadDate,embedUrl:media.embed})));
  const json=JSON.stringify({'@context':'https://schema.org','@graph':videos}).replace(/</g,'\\u003c');
  return <section className="order-4 mx-auto w-full max-w-6xl px-3 py-7 sm:order-none sm:px-5" aria-labelledby="published-company-work">{videos.length>0&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:json}}/>}<h2 id="published-company-work" className="mb-2 text-xl font-bold text-[#183b55] sm:text-3xl">{en?'Company projects and videos':'مشاريع وفيديوهات الشركة'}</h2><p className="mb-4 text-sm leading-7 text-slate-600">{en?'Approved projects and videos shared by the company.':'مشاريع وفيديوهات الشركة المعتمدة والمنشورة على بيت الريف.'}</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{projects.map(project=><article key={project.id} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{project.media[0]&&<ProjectMedia media={project.media[0]} title={project.title} locale={locale}/>}<div className="p-4"><h3 className="text-base font-bold text-[#183b55]">{project.title}</h3>{project.description&&<p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">{project.description}</p>}{(project.city||project.emirate)&&<p className="mt-3 flex items-center gap-1 text-xs text-slate-500"><MapPin size={14}/>{[project.city,project.emirate].filter(Boolean).join('، ')}</p>}{project.media.slice(1).map((media,index)=><a key={index} href={media.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-[#185b87] underline">{en?'View additional media':'عرض مرفق إضافي'}</a>)}</div></article>)}</div></section>;
}
