import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, ChevronDown, Factory } from 'lucide-react';
import { UAE_MAIN_SECTORS } from '../data/directoryDiscovery';
import { SERVICE_CATEGORIES } from '../data/siteTaxonomy';

// Reuse existing catalog routes; never invent a parallel sector tree.
const CATEGORY_SLUGS = {
  'general-contracting': ['general-contracting'],
  'interior-design': ['engineering-consultants', 'interior-design'],
  'general-maintenance': ['general-maintenance', 'finishing-works'],
  'building-materials': ['building-materials'],
  'aluminium-glass': ['aluminium-glass', 'workshops', 'carpentry'],
  'furniture-decor': ['furniture-decor'],
  'equipment-rental': ['equipment-rental', 'workshops'],
  'cleaning-services': ['cleaning-services'],
};

const AL_AIN_CHOICES = {
  'general-contracting': [['general-contracting', 'المقاولات والبناء', 'Contracting and construction']],
  'interior-design': [['interior-design', 'التصميم والاستشارات', 'Design and consultancy']],
  'general-maintenance': [['general-maintenance', 'الصيانة والتشطيبات', 'Maintenance and finishing']],
  'building-materials': [['building-materials', 'مواد البناء', 'Building materials']],
  'aluminium-glass': [['aluminium-wood-glass', 'الألمنيوم والخشب والزجاج', 'Aluminium, wood and glass']],
  'furniture-decor': [['furniture-decor', 'الأثاث والمفروشات والتجهيز', 'Furniture and furnishings']],
  'equipment-rental': [['equipment-rental', 'المصانع ومعدات الإيجار', 'Factories and equipment rental']],
  'cleaning-services': [['cleaning-services', 'خدمات التنظيف', 'Cleaning services']],
};

// The text is rendered in server HTML even while the native detail element is closed.
// Each topic explains a distinct project decision, not a template repeated across services.
const guidance = {
  'general-contracting': {
    ar:'حدّد نوع البناء ومساحة الأرض والمخططات المعتمدة ونطاق الهيكل والتشطيبات والأعمال الخارجية. اطلب تفصيل البنود والمواد ومراحل الإنجاز والمسؤولية عن التصاريح قبل مقارنة عروض المقاولين.',
    en:'Describe the plot, approved drawings, required structure, finishes and external works. Request a breakdown of materials, work stages and permit responsibilities before comparing construction quotations.'
  },
  'interior-design': {
    ar:'جهّز أبعاد الفراغات واستخداماتها وأسلوب التصميم والميزانية. ميّز في الطلب بين تصور الديكور والمخططات المعمارية والإنشائية ورسومات الكهرباء والتكييف والإشراف خلال التنفيذ.',
    en:'Provide room dimensions, intended uses, design priorities and budget. Distinguish concept visuals from architectural drawings, structural details, building services coordination and site supervision.'
  },
  'general-maintenance': {
    ar:'صف العطل أو أعمال التشطيب المطلوبة وحدد متى بدأت المشكلة وأماكن الرطوبة أو التلف. اطلب فصل المعاينة والإصلاح والمواد وإعادة التشطيب والضمان إن وجد.',
    en:'Describe the fault, visible damage or required finishing work. Separate inspection, root-cause repair, replacement materials, making good and any stated warranty in the quotation.'
  },
  'building-materials': {
    ar:'أرسل جدول كميات يحدد المقاس والنوع ودرجة الجودة واللون وموقع التسليم. راجع تكلفة النقل والتحميل ومواعيد التوريد وسياسة الاستبدال، وليس سعر الوحدة وحده.',
    en:'Prepare a bill of quantities with dimensions, grade, colour and delivery address. Compare freight, unloading, lead times and returns alongside the unit price.'
  },
  'aluminium-glass': {
    ar:'اطلب قياس الموقع بعد التشطيب، وحدد سماكة القطاعات وأنواع الزجاج والأكسسوارات وطريقة الفتح. راجع رسومات الورشة والعينات وما يشمله السعر من فك وتركيب وعزل.',
    en:'Arrange site measurements after finishes, specifying frame profiles, glazing, hardware and opening direction. Review shop drawings, samples, removal, installation and sealing.'
  },
  'furniture-decor': {
    ar:'قِس الغرف والممرات والمصاعد قبل طلب الأثاث أو تفصيل المجالس والستائر. وضح خامات الخشب والقماش والإسفنج والتوصيل والتركيب وأعمال التعديل.',
    en:'Measure rooms, doors and lifts before ordering furniture, majlis seating or curtains. Record joinery, fabric, foam, delivery, assembly and alteration requirements.'
  },
  'equipment-rental': {
    ar:'اذكر نوع المعدة وقدرتها المطلوبة ومدة الاستخدام وأبعاد المدخل وحالة الأرض. تأكد من تكلفة النقل والمشغل والوقود والفحص وشروط التعطل وإعادة المعدة.',
    en:'State the task, equipment capacity, hire period, access width and ground condition. Clarify transport, operator, fuel, inspection, breakdown and collection terms.'
  },
  'cleaning-services': {
    ar:'حدّد نوع العقار وعدد الغرف وحالة الأسطح والمفروشات والمساحة. اذكر إن كان المطلوب تنظيفًا دوريًا أو عميقًا أو بعد التشطيب، ولا تفترض دخول التعقيم أو المكافحة دون الاتفاق عليه.',
    en:'State the property type, room count, surfaces, upholstery and work area. Distinguish routine cleaning, deep cleaning and post-construction work; pest treatment or sanitisation requires an agreed separate scope.'
  }
};

export function sectorChoices(sector, sectionKey, locale = 'ar', locationRoot = '', locationMode = '') {
  const en = locale === 'en';
  if (locationMode === 'emirate-area') {
    return [{slug:sector.slug,name:sector.name[locale],href:locationRoot+'/'+sector.slug}];
  }
  if (locationMode === 'al-ain' || locationMode === 'al-ain-district') {
    return (AL_AIN_CHOICES[sector.slug] || []).map(([slug, ar, english]) => ({
      slug, name:en?english:ar, href:locationRoot+'/'+slug
    }));
  }
  const root=sectionKey==='providers'?'/providers/specialty/':en?'/categories/':'/services/';
  return (CATEGORY_SLUGS[sector.slug] || []).filter(slug=>!locationRoot || SERVICE_CATEGORIES.some(item=>item.slug===slug)).map(slug=>{
    const category=SERVICE_CATEGORIES.find(item=>item.slug===slug);
    return {slug,name:category?(en?category.nameEn:category.nameAr):(en?'Workshops and factories':'المصانع والورش'),href:locationRoot?locationRoot+'/'+slug:(en?'/en':'')+root+slug};
  });
}

function SectorCard({sector,sectionKey,locale,locationRoot,locationMode}) {
  const en=locale==='en';
  const choices=sectorChoices(sector,sectionKey,locale,locationRoot,locationMode);
  const primary=choices[0];
  const note=guidance[sector.slug]?.[locale];
  return <article id={'sector-'+sector.slug} className="min-w-0 self-start scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
      {sector.image?<Image src={sector.image} alt={(en?'Illustration of ':'صورة توضيحية عن ')+sector.name[locale]} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" className="object-cover"/>:<span className="flex h-full items-center justify-center text-slate-500"><Factory size={32} aria-hidden="true"/></span>}
    </div>
    <div className="min-w-0 p-3 sm:p-4">
      <h3 className="text-sm font-extrabold leading-6 text-[#193b53] sm:text-lg">{sector.name[locale]}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-6 text-slate-600 sm:text-sm">{sector.description[locale]}</p>
      <details className="group/more mt-2" aria-label={(en?'More about ':'المزيد عن ')+sector.name[locale]}>
        <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-1 text-xs font-bold text-[#185b87] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 sm:text-sm">
          {en?'More':'المزيد'} <ChevronDown size={15} aria-hidden="true" className="transition group-open/more:rotate-180"/>
        </summary>
        {note&&<p className="pb-2 text-xs leading-7 text-slate-700 sm:text-sm">{note}</p>}
        {choices.length>1&&<nav aria-label={en?'Related specialties':'التخصصات المرتبطة'} className="grid gap-1 pb-2">
          {choices.slice(1).map(choice=><Link key={choice.slug} href={choice.href} className="text-xs font-semibold leading-6 text-[#185b87] underline underline-offset-2">{choice.name}</Link>)}
        </nav>}
      </details>
      {primary?<Link href={primary.href} aria-label={(en?'Explore ':'استكشف ')+sector.name[locale]} className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#185b87] px-2 py-2 text-center text-xs font-bold leading-5 text-white hover:bg-[#12486b] sm:text-sm">
        {en?'Explore':'استكشف'}<ArrowUpLeft size={16} className={'shrink-0 '+(en?'rotate-180':'')} aria-hidden="true"/>
      </Link>:<a href="https://wa.me/971564456337" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-[#185b87] px-2 text-center text-xs font-bold text-[#185b87]">{en?'Contact customer service':'تواصل مع خدمة العملاء'}</a>}
    </div>
  </article>;
}

export default function MainSectorCards({sectionKey,locale='ar',locationRoot='',locationMode='',sectors=UAE_MAIN_SECTORS}) {
  return <div dir={locale==='en'?'ltr':'rtl'} className="grid grid-cols-2 items-start gap-3 md:gap-4 lg:grid-cols-4">
    {sectors.map(sector=><SectorCard key={sector.slug} sector={sector} sectionKey={sectionKey} locale={locale} locationRoot={locationRoot} locationMode={locationMode}/>)}
  </div>;
}
