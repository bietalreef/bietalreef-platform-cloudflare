import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import draft from '../../data/providerTemplates/makkah-cleaning-visual-launch.draft.json';

const MEDIA = '/images/providers/makkah-cleaning/';
const texts = {
  ar: {
    preview:'معاينة غير منشورة', back:'العودة إلى ملف مكة', services:'الخدمات الأخرى', offers:'العروض المقترحة',
    inquiry:'اطلب تفاصيل الخدمة', description:'يُحدد نطاق العمل والتكلفة وموعد التنفيذ بعد وصف العقار وحالته والموقع المطلوب.',
    booking:'لم يتم اعتماد هذا العرض للنشر. الخصم وشروط السريان والسعر النهائي قيد المراجعة.',
    areas:'المناطق المقترحة: العين وأبوظبي ودبي. يجب تأكيد نطاق التغطية مع الشركة قبل الاتفاق.',
    disclaimer:'صفحة مراجعة داخلية. لا تمثل عرضًا معتمدًا أو صفحة إنتاجية مفهرسة.'
  },
  en:{
    preview:'Unpublished preview',back:'Back to Makkah profile',services:'Other services',offers:'Proposed offers',
    inquiry:'Ask about this service',description:'Scope, price and availability depend on property details, condition and the requested location.',
    booking:'This offer has not been approved for publication. Discount terms, validity and final pricing are under review.',
    areas:'Proposed areas: Al Ain, Abu Dhabi and Dubai. Confirm local coverage with the provider before booking.',
    disclaimer:'Internal review page. Not an approved public offer or indexable production page.'
  }
};
export default function MakkahDraftDetailPage({ locale='ar', section, slug }) {
  const en=locale==='en';
  const t=texts[locale]||texts.ar;
  const data=section==='services'?draft.services:draft.offers;
  const item=data.find(x=>x.slug===slug);
  if(!item)return null;
  const name=en?item.en:item.ar;
  const base=(en?'/en':'')+'/preview/makkah-cleaning';
  const dest=(en?'/en':'')+'/providers';
  const other=data.filter(x=>x.slug!==slug);
  const subject=encodeURIComponent((en?'Inquiry about ':'استفسار عن ')+name+' — BR-3000530');
  return <>
    <Head>
      <title>{name} | {en?'Makkah Cleaning — Draft':'مكة لخدمات التنظيف — معاينة'}</title>
      <meta name="robots" content="noindex,nofollow,noarchive" />
      <meta name="description" content={t.disclaimer} />
    </Head>
    <Navbar />
    <main dir={en?'ltr':'rtl'} lang={locale} className="mx-auto max-w-5xl px-4 pb-28 pt-5 text-[#133d29]">
      <nav className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link href={base} className="rounded-xl border border-[#d4c49c] px-4 py-2">{t.back}</Link>
        <Link href={dest} className="underline">{en?'Provider directory':'دليل الشركات'}</Link>
      </nav>
      <div className="overflow-hidden rounded-3xl border border-[#e8ddcb] bg-white">
        <div className="grid gap-4 md:grid-cols-2">
          <img src={MEDIA+item.file} alt={name} width="640" height="360" className="h-56 w-full object-cover md:h-full" />
          <div className="space-y-4 p-5 md:p-8">
            <p className="inline-flex rounded-full bg-[#f2e8cf] px-3 py-1 text-xs font-bold">{t.preview}</p>
            <h1 className="text-3xl font-extrabold leading-tight">{name}</h1>
            <p className="leading-8 text-[#496250]">{section==='offers'?t.booking:t.description}</p>
            <p className="text-sm leading-7">{t.areas}</p>
            <a href={'https://wa.me/971545575370?text='+subject} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl bg-[#133d29] px-5 py-3 font-bold text-white">{t.inquiry}</a>
          </div>
        </div>
      </div>
      <p className="my-5 rounded-xl border border-[#e1c992] bg-[#fff9e9] p-4 text-sm">{t.disclaimer}</p>
      <section><h2 className="mb-3 text-xl font-bold">{section==='offers'?t.offers:t.services}</h2>
        <div className="grid gap-2 sm:grid-cols-3">{other.map(x=><Link key={x.slug} href={base+'/'+section+'/'+x.slug} className="flex items-center gap-3 rounded-2xl border border-[#e8ddcb] bg-white p-2">
          <img src={MEDIA+x.file} width="96" height="70" alt="" loading="lazy" className="h-16 w-20 rounded-lg object-cover" />
          <span className="text-sm font-semibold">{en?x.en:x.ar}</span>
        </Link>)}</div>
      </section>
    </main>
    <Footer />
  </>;
}
