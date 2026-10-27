import Image from 'next/image';
import { ArrowLeft, ArrowRight, Building2, MessageCircle, Users } from 'lucide-react';

const content = {
  ar: { home: 'الرئيسية', label: 'دليل الشركات والمهنيين', title: 'اختر الشركة أو المهني المناسب لمشروعك', description: 'ابدأ من القطاع، ثم افتح بطاقة الجهة للاطلاع على التخصص ونطاق الخدمة والمشاريع وطرق التواصل في مسار واضح وسهل.', browse: 'استعرض القطاعات', contact: 'تحدث مع فريق الانضمام', alt: 'شركات خدمات البناء والمقاولات والصيانة في بيت الريف' },
  en: { home: 'Home', label: 'Businesses & Professionals', title: 'Choose the right business or professional for your project', description: 'Start with a sector, then open a business profile to review specialties, service coverage, projects and contact channels through one clear journey.', browse: 'Browse sectors', contact: 'Talk to onboarding', alt: 'Building, contracting and maintenance providers on Biet Al Reef' },
};

export default function ProvidersDirectoryHero({ locale = 'ar' }) {
  const isAr = locale === 'ar';
  const t = content[locale];
  const DirectionArrow = isAr ? ArrowLeft : ArrowRight;
  return (
    <section className="br-discovery-hero bg-[#FDFBF7] px-3 pb-2 pt-3 md:px-4 md:pb-12 md:pt-10" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#E6DCC8] bg-white shadow-[0_3px_16px_rgba(18,58,70,0.05)] md:rounded-[2.5rem] md:shadow-[0_20px_55px_rgba(18,58,70,0.08)]">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <div className="flex flex-col justify-center p-3.5 md:p-10 lg:p-12">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#FFF8E5] px-2.5 py-1 text-[10px] font-black text-[#8A6A00] md:gap-2 md:px-4 md:py-2 md:text-xs"><Users className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />{t.label}</span>
            <h1 className="mt-2.5 max-w-2xl text-xl font-black leading-[1.4] text-[#0F3F1A] md:mt-5 md:text-5xl">{t.title}</h1>
            <p className="mt-1.5 max-w-2xl text-xs font-semibold leading-5 text-gray-600 md:mt-5 md:text-base md:leading-9">{t.description}</p>
            <div className="mt-3 flex gap-2 md:mt-7 md:gap-3">
              <a href="#provider-sectors" className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl bg-[#0F3F1A] px-2 py-2 text-xs font-black text-white transition hover:bg-[#123A46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] md:min-h-12 md:flex-none md:gap-2 md:rounded-2xl md:px-6 md:py-3 md:text-sm"><Building2 className="h-4 w-4 text-[#F7E7A0] md:h-5 md:w-5" aria-hidden="true" />{t.browse}<DirectionArrow className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" /></a>
              <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl border border-[#D4AF37]/45 bg-white px-2 py-2 text-xs font-black text-[#0F3F1A] transition hover:bg-[#FFF8E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] md:min-h-12 md:flex-none md:gap-2 md:rounded-2xl md:px-6 md:py-3 md:text-sm"><MessageCircle className="h-4 w-4 text-[#8A6A00] md:h-5 md:w-5" aria-hidden="true" />{t.contact}</a>
            </div>
          </div>
          <div className="relative hidden min-h-[300px] overflow-hidden bg-[#F5EFE4] lg:block lg:min-h-[500px]"><Image src="/images/providers-hero.webp" alt={t.alt} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 48vw" /><div className={`absolute inset-0 ${isAr ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-white/20 via-transparent to-[#0F3F1A]/12`} /></div>
        </div>
      </div>
    </section>
  );
}
