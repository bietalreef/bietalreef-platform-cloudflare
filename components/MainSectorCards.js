import Image from 'next/image';
import Link from 'next/link';
import { Factory, ArrowUpLeft } from 'lucide-react';
import { UAE_MAIN_SECTORS } from '../data/directoryDiscovery';
import { SERVICE_CATEGORIES } from '../data/siteTaxonomy';
import CompactDescription from './cards/CompactDescription';

// Each choice points to an existing category; a broad sector can contain more than one.
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

export function sectorChoices(sector, sectionKey, locale = 'ar', locationRoot = '', locationMode = '') {
  const en = locale === 'en';
  if (locationMode === 'al-ain' || locationMode === 'al-ain-district') {
    const choices = AL_AIN_CHOICES[sector.slug] || [];
    return choices.map(([slug, ar, english]) => ({ slug, name: en ? english : ar, href: `${locationRoot}/${slug}` }));
  }
  const root = sectionKey === 'providers' ? '/providers/specialty/' : en ? '/categories/' : '/services/';
  return (CATEGORY_SLUGS[sector.slug] || []).filter(slug => !locationRoot || SERVICE_CATEGORIES.some(item => item.slug === slug)).map(slug => {
    const category = SERVICE_CATEGORIES.find(item => item.slug === slug);
    return {
      slug,
      name: category ? (en ? category.nameEn : category.nameAr) : (en ? 'Workshops and factories' : 'المصانع والورش'),
      href: locationRoot ? `${locationRoot}/${slug}` : `${en ? '/en' : ''}${root}${slug}`,
    };
  });
}

export default function MainSectorCards({ sectionKey, locale = 'ar', locationRoot = '', locationMode = '', sectors = UAE_MAIN_SECTORS }) {
  const en = locale === 'en';
  return <div dir={en ? 'ltr' : 'rtl'} className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
    {sectors.map(sector => <article id={`sector-${sector.slug}`} key={sector.slug} className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-[#e5d9c6] bg-white shadow-sm">
      <div className="relative aspect-[16/9] bg-[#f1ece3]">
        {sector.image ? <Image src={sector.image} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover"/> : <span className="flex h-full items-center justify-center text-[#a38d6a]"><Factory size={38} aria-hidden="true"/></span>}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="text-base font-extrabold leading-6 text-[#193b53] sm:text-lg">{sector.name[locale]}</h3>
        <CompactDescription className="mt-1" text={sector.description[locale]} locale={locale}/>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {sectorChoices(sector, sectionKey, locale, locationRoot, locationMode).map(choice => <Link key={choice.slug} href={choice.href} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-[#c6dbe9] bg-[#eff6fb] px-2 py-1.5 text-xs font-bold leading-5 text-[#175884] hover:bg-[#e0eef8]">{choice.name}<ArrowUpLeft size={14} aria-hidden="true"/></Link>)}
          {!sectorChoices(sector, sectionKey, locale, locationRoot, locationMode).length && <a href="https://wa.me/971564456337" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-[#185b87] bg-white px-3 py-2 text-xs font-bold text-[#185b87] hover:bg-[#eff6fb]">{en ? 'Contact customer service' : 'تواصل مع خدمة العملاء'}<ArrowUpLeft size={14} aria-hidden="true"/></a>}
        </div>
      </div>
    </article>)}
  </div>;
}
