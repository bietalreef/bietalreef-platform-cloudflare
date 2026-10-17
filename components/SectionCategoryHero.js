import Image from 'next/image';
import Link from 'next/link';
import { Boxes, ExternalLink, MessageCircle, Wrench } from 'lucide-react';

export default function SectionCategoryHero({ locale = 'ar', type, title, description, image, primaryHref }) {
  const isEn = locale === 'en';
  const isService = type === 'services';
  const base = isEn ? '/en' : '';
  const backHref = isService ? `${base}/services` : `${base}/marketplace`;
  const label = isService ? (isEn ? 'Services & Offers' : 'الخدمات والعروض') : (isEn ? 'Products & Stores' : 'المنتجات والمتاجر');
  const backLabel = isService ? (isEn ? 'Browse all services' : 'كل الخدمات والعروض') : (isEn ? 'Browse all products' : 'كل المنتجات والمتاجر');
  const requestLabel = isService ? (isEn ? 'Request service guidance' : 'اطلب توجيه للخدمة') : (isEn ? 'Request sourcing help' : 'اطلب مساعدة في التوريد');
  const Icon = isService ? Wrench : Boxes;
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="bg-[#FCFCF8] px-4 pb-10 pt-6 md:pb-14 md:pt-10">
      <div className="relative mx-auto min-h-[360px] max-w-6xl overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/35 bg-[#123A46] shadow-[0_30px_80px_rgba(18,58,70,.18)] md:min-h-[460px]">
        <Image src={image} alt={title} fill priority className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061B28]/90 via-[#061B28]/50 to-transparent" />
        <div className={`absolute inset-0 ${isEn ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-[#061B28]/60 via-transparent to-transparent`} />
        <div className="relative flex min-h-[360px] flex-col justify-end px-5 pb-6 pt-32 text-white sm:px-8 md:min-h-[460px] md:p-10 md:pt-40 lg:p-12 lg:pt-40">
          <span className="inline-flex self-start items-center gap-2 rounded-full border border-[#F7E7A0]/40 bg-[#123A46]/88 px-4 py-2 text-xs font-black shadow-lg backdrop-blur-xl"><Icon className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />{label}</span>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-relaxed sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-8 text-white/85 md:text-lg md:leading-9">{description}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {primaryHref ? <Link href={primaryHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#173F35] px-6 py-3 text-center font-black text-white">{isEn ? 'Explore services in Al Ain' : 'استكشف الخدمات في العين'}</Link> : <a href="https://wa.me/971564456337" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#173F35] px-6 py-3 text-center font-black text-white"><MessageCircle className="h-5 w-5 shrink-0" />{requestLabel}</a>}
            <Link href={backHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/12 px-6 py-3 text-center font-black text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/20">{backLabel}<ExternalLink className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
