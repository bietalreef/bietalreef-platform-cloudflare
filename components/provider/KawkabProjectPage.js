import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import KawkabMobileContactBar from './KawkabMobileContactBar';
import {
 KAWKAB_PROJECT, KAWKAB_PROFILE, KAWKAB_ORIGIN, KAWKAB_LOGO,
 kawkabProjectPath, kawkabPath, kawkabWhatsapp
} from '../../lib/kawkabPresence';

export default function KawkabProjectPage({locale='ar',contextBase=''}) {
 const en=locale==='en',project=KAWKAB_PROJECT;
 const name=en?project.name_en:project.name_ar;
 const description=en?project.description_en:project.description_ar;
 const path=kawkabProjectPath(locale);
 const url=KAWKAB_ORIGIN+path;
 const schema={
  '@context':'https://schema.org','@type':'CollectionPage',
  '@id':url+'#project',url,name,description,
  inLanguage:en?'en-AE':'ar-AE',
  isPartOf:{'@id':KAWKAB_ORIGIN+kawkabPath('ar')+'#business'},
  associatedMedia:project.images.map(img=>({'@type':'ImageObject',contentUrl:KAWKAB_ORIGIN+img.url,name:img['image_title_'+locale],caption:img['caption_'+locale],width:img.width,height:img.height})),
 };
 return <div dir={en?'ltr':'rtl'} lang={en?'en':'ar'} className="min-h-screen bg-[#fbfaf7] pb-20 text-[#253044] sm:pb-0">
 <Head>
  <title>{name} | {en?KAWKAB_PROFILE.nameEn:KAWKAB_PROFILE.nameAr} | {en?'Biet Al Reef':'بيت الريف'}</title>
  <meta name="description" content={description}/>
  <meta name="robots" content="index, follow, max-image-preview:large"/>
  <link rel="canonical" href={url}/>
  <link rel="alternate" hrefLang="ar-AE" href={KAWKAB_ORIGIN+kawkabProjectPath('ar')}/>
  <link rel="alternate" hrefLang="en-AE" href={KAWKAB_ORIGIN+kawkabProjectPath('en')}/>
  <link rel="alternate" hrefLang="x-default" href={KAWKAB_ORIGIN+kawkabProjectPath('ar')}/>
  <meta property="og:title" content={name}/>
  <meta property="og:description" content={description}/>
  <meta property="og:image" content={KAWKAB_ORIGIN+project.images[0].url}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
 </Head>
 <Navbar locale={locale}/>
 <main>
  <nav aria-label="Breadcrumb" className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-4 text-xs text-[#7b6d58] md:px-4">
   <Link href={kawkabPath(locale,'home',contextBase)}>{en?'Company profile':'ملف كوكب الصعيد'}</Link><span>/</span>
   <Link href={kawkabPath(locale,'gallery',contextBase)}>{en?'Projects and service covers':'المشاريع وأغلفة الخدمات'}</Link><span>/</span>
   <span className="font-semibold text-[#374152]">{name}</span>
  </nav>
  <div className="mx-auto max-w-6xl px-3 pb-7 md:px-4 md:pb-16">
   <header className="mb-4 md:mb-8">
    <div className="flex items-center gap-3"><img src={KAWKAB_LOGO.url} alt={en?'Kawkab Al Saeed logo':'شعار كوكب الصعيد'} width="64" height="64" className="h-11 w-11 rounded-lg border bg-white object-contain p-1 md:h-14 md:w-14"/>
    <div><p className="text-xs font-semibold text-[#816139]">{en?'Interior design project':'مشروع تصميم داخلي'}</p>
    <h1 className="mt-1 text-xl font-extrabold md:text-4xl">{name}</h1></div></div>
    <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#5b5b57] md:mt-5 md:max-w-4xl md:line-clamp-none md:text-lg md:leading-9">{description}</p>
   </header>
   <div className="grid grid-cols-2 gap-2 md:gap-4">
    {project.images.map((image,i)=><figure key={image.id} className={`min-w-0 overflow-hidden rounded-xl border border-[#e6daca] bg-white ${i===0?'col-span-2':''}`}>
      <img src={image.url} alt={image['alt_'+locale]} width={image.width} height={image.height} loading={i===0?'eager':'lazy'} decoding="async"
       className={`block w-full object-cover ${i===0?'aspect-[4/3] md:aspect-[16/9]':'aspect-[4/3]'}`}/>
      <figcaption className="p-2 text-xs font-semibold leading-6 text-[#4b4c4b] md:p-4 md:text-sm">{image['image_title_'+locale]?.split('|')[0].trim()}</figcaption>
    </figure>)}
   </div>
   <section className="mt-5 hidden rounded-2xl border border-[#e8dccc] bg-white p-6 md:block">
    <h2 className="text-xl font-bold">{en?'Project details and design elements':'تفاصيل المشروع وعناصر التصميم'}</h2>
    <p className="mt-3 text-sm leading-8 text-[#5b5b55]">{description}</p>
    <p className="mt-3 text-sm leading-8 text-[#5b5b55]">{en?'The three gallery views highlight the relationship between the TV feature wall, the living seating zone and the adjoining dining area. You can request comparable finishing, cladding, woodwork and paint options for your own property.':'توضح زوايا الصور الثلاث تنسيق جدار التلفزيون ومنطقة الجلوس والفراغ المفتوح على طاولة الطعام، مع خامات خشبية وكسوة جدارية وإضاءة مدروسة. يمكن طلب تشطيبات مشابهة تناسب أبعاد العقار وخيارات الخامات والميزانية.'}</p>
   </section>
   <div className="mt-5 flex flex-wrap gap-3">
    <a href={kawkabWhatsapp(locale,name)} target="_blank" rel="noopener noreferrer" className="hidden rounded-xl bg-[#263e53] px-6 py-3 text-sm font-bold text-white sm:inline-flex">{en?'Request a similar design quote':'طلب عرض سعر لتصميم مشابه'}</a>
    <Link href={kawkabPath(locale,'gallery',contextBase)} className="rounded-xl border border-[#d6c5ad] bg-white px-5 py-3 text-sm font-bold">{en?'Service cover gallery':'العودة إلى أغلفة الخدمات'}</Link>
   </div>
  </div>
 </main>
 <Footer/>
 <KawkabMobileContactBar locale={locale} service={name}/>
 </div>;
}
