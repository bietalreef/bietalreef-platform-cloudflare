import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import KawkabMobileContactBar from './KawkabMobileContactBar';
import KawkabServiceVisual from './KawkabServiceVisual';
import {
  KAWKAB_COVERAGE, KAWKAB_PROFILE, KAWKAB_HERO, KAWKAB_LOGO,
  KAWKAB_SPECIALTIES, KAWKAB_ORIGIN,
  kawkabPath, kawkabServicePath, kawkabEmiratePath, kawkabWhatsapp
} from '../../lib/kawkabPresence';

const REGION_GUIDES = {
  'abu-dhabi': {
    ar: {
      headline:'الدهانات والتشطيبات والصيانة في إمارة أبوظبي',
      intro:'تستقبل كوكب الصعيد طلبات الأعمال الفنية في نطاق إمارة أبوظبي، بما يشمل العين. ابدأ بتحديد المدينة والمنطقة، ونوع العقار وطبيعة العمل حتى يمكن للشركة مراجعة نطاق الخدمة.',
      what:'عند طلب دهان أو بلاستر، أرسل صور الجدران والأسقف وبيّن حالة التشطيب الحالي. ولأعمال السباكة والتكييف، اذكر نوع المعدة أو موقع المشكلة وما إذا كانت هناك أعمال تجهيز أو تكسير مرتبطة بها.',
      details:'لتسهيل التسعير، أرسل الأبعاد التقريبية، وصور الموقع، والموعد المطلوب، وأي تعليمات لدخول المبنى. يتم الاتفاق على المعاينة والخامات والمدة مع الشركة.',
      faq:'هل تشمل التغطية مدينة العين؟',
      answer:'نطاق التغطية المسجل هو إمارة أبوظبي، ويمكن تحديد العين والمنطقة داخل الطلب. يرجى تأكيد توافر الفريق والموعد مع الشركة قبل الحجز.'
    },
    en: {
      headline:'Painting, finishing and maintenance in Abu Dhabi Emirate',
      intro:'Kawkab Al Saeed accepts enquiries across Abu Dhabi Emirate, including Al Ain. Specify your city, district, property type and required trade so the company can review the scope.',
      what:'For painting or plaster, provide photos of the walls, ceilings and existing finish. For plumbing or AC, describe the equipment or fault location and any related opening or reinstatement work.',
      details:'Approximate dimensions, site images, a preferred date and access instructions help clarify the quotation. Inspection, materials and timing are agreed with the company.',
      faq:'Does the service area include Al Ain?',
      answer:'The registered coverage is Abu Dhabi Emirate, which includes Al Ain. Confirm team availability and timing with the company before booking.'
    }
  },
  dubai: {
    ar: {
      headline:'التشطيبات والديكور والصيانة في دبي',
      intro:'يمكن إرسال طلبات الدهانات والديكور وأعمال الصيانة لكوكب الصعيد ضمن نطاق إمارة دبي. حدّد موقع العقار وطبيعة المساحة ونوع التشطيب، ولا تفترض وجود فرع محلي قبل تأكيد الشركة.',
      what:'للديكور وورق الجدران، حدّد المقاسات ونوع الكسوة أو النقشة والنتيجة المطلوبة. ولأعمال النجارة أو الأرضيات الخشبية، أرفق صور الموقع والقياسات وحالة الأرضية الحالية.',
      details:'يساعد ذكر مواعيد الوصول للمبنى ومكان الوقوف أو تحميل المواد وقيود العمل إن وجدت على تحديد ترتيبات المعاينة والتنفيذ بعد تأكيد توفر الخدمة.',
      faq:'هل يلزم إرسال صور قبل طلب السعر؟',
      answer:'الصور والقياسات تساعد على فهم المشروع، وقد يلزم فحص الموقع لتحديد الخامات والتجهيزات والسعر النهائي.'
    },
    en: {
      headline:'Finishing, interior décor and maintenance in Dubai',
      intro:'You can submit enquiries for painting, décor and maintenance within Dubai Emirate. Give the property location, type and desired finish; do not assume a local branch before confirming with the company.',
      what:'For wallpaper or décor, include measurements, wall condition, selected design and desired look. For carpentry or wood flooring, share photos, dimensions and the existing floor condition.',
      details:'Building access hours, loading arrangements and relevant work restrictions help the company discuss inspection and implementation when service availability is confirmed.',
      faq:'Do I need photos before requesting a quotation?',
      answer:'Photos and measurements help describe the project. A site inspection may still be required to confirm preparation, materials and final pricing.'
    }
  },
  sharjah: {
    ar: {
      headline:'خدمات الصيانة والدهانات والتشطيبات في الشارقة',
      intro:'الشارقة ضمن نطاق تغطية كوكب الصعيد المسجل. أرسل المنطقة وموقع العقار مع التخصص المطلوب حتى يتم تأكيد إمكانية تقديم الخدمة والموعد المناسب.',
      what:'في أعمال إصلاح الأسطح والدهانات، وضّح آثار الرطوبة أو التشققات ونوع السطح ومساحته. وفي أعمال السباكة والتكييف، حدّد العطل أو العمل المطلوب وطبيعة الوصول للمعدات.',
      details:'اطلب عرضًا يوضح الأعمال التحضيرية والخامات والتنفيذ والتنظيف والمدة، ولا تعتبر الوصف العام سعرًا أو حجزًا نهائيًا قبل رد الشركة.',
      faq:'هل السعر ثابت لكل مناطق الشارقة؟',
      answer:'لا؛ السعر يعتمد على حالة الموقع وحجم العمل والخامات ومتطلبات المعاينة والتنقل. تطلب التفاصيل من الشركة للحصول على عرض مناسب.'
    },
    en: {
      headline:'Painting, finishing and maintenance services in Sharjah',
      intro:'Sharjah is part of Kawkab Al Saeed’s registered coverage. Send your district, property location and trade requirements for the company to confirm availability and a suitable appointment.',
      what:'For surface repair and painting, describe cracks, moisture, substrate and area. For plumbing or AC, specify the fault or proposed work and access to the equipment.',
      details:'Request a written scope covering preparation, materials, installation, cleanup and expected timing. The page is not a final price or guaranteed booking.',
      faq:'Is the price the same across Sharjah?',
      answer:'No. Pricing depends on site condition, project size, materials, inspection requirements and travel arrangements. Contact the company for a tailored quotation.'
    }
  }
};

export default function KawkabEmiratePage({locale='ar',emirate='abu-dhabi'}) {
  const en=locale==='en';
  const area=KAWKAB_COVERAGE.find(item=>item.slug===emirate);
  if (!area) return null;
  const guide=REGION_GUIDES[emirate][locale], name=area[locale];
  const url=KAWKAB_ORIGIN+kawkabEmiratePath(locale,emirate);
  const description=guide.intro;
  const faq=[{q:guide.faq,a:guide.answer},{
    q:en?'How do I request a quotation?':'كيف أطلب عرض سعر؟',
    a:en?'Choose a specialty, share the site location, photos and approximate measurements, and contact the company through the enquiry buttons.':'حدد التخصص والموقع، وأرسل الصور والمقاسات التقريبية ثم تواصل مع الشركة عبر أزرار الاتصال أو واتساب.'
  }];
  const schema={
    '@context':'https://schema.org','@type':'WebPage',url,name:guide.headline,
    description,inLanguage:en?'en-AE':'ar-AE',
    about:{'@type':'Service',name:en?'Technical services and finishing':'خدمات الصيانة والتشطيبات',
      provider:{'@type':'Organization',name:en?KAWKAB_PROFILE.nameEn:KAWKAB_PROFILE.nameAr,url:KAWKAB_ORIGIN+kawkabPath(locale)},
      areaServed:{'@type':'AdministrativeArea',name}},
  };
  return <div dir={en?'ltr':'rtl'} lang={en?'en':'ar'} className="min-h-screen bg-[#fbfaf7] pb-20 text-[#252b35] sm:pb-0">
    <Head>
      <title>{guide.headline} | {en?KAWKAB_PROFILE.nameEn:KAWKAB_PROFILE.nameAr} | {en?'Biet Al Reef':'بيت الريف'}</title>
      <meta name="description" content={description}/>
      <meta name="robots" content="index, follow, max-image-preview:large"/>
      <link rel="canonical" href={url}/>
      <link rel="alternate" hrefLang="ar-AE" href={KAWKAB_ORIGIN+kawkabEmiratePath('ar',emirate)}/>
      <link rel="alternate" hrefLang="en-AE" href={KAWKAB_ORIGIN+kawkabEmiratePath('en',emirate)}/>
      <link rel="alternate" hrefLang="x-default" href={KAWKAB_ORIGIN+kawkabEmiratePath('ar',emirate)}/>
      <meta property="og:title" content={guide.headline}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={KAWKAB_ORIGIN+KAWKAB_HERO.url}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    </Head>
    <Navbar/>
    <main>
      <nav aria-label="Breadcrumb" className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 text-xs text-[#7c6f5b] md:px-4">
        <Link href={kawkabPath(locale)}>{en?KAWKAB_PROFILE.nameEn:KAWKAB_PROFILE.nameAr}</Link>
        <span>/</span><Link href={kawkabPath(locale,'service-areas')}>{en?'Service areas':'مناطق الخدمة'}</Link><span>/</span><span className="font-bold">{name}</span>
      </nav>
      <section className="mx-auto max-w-6xl px-3 pt-1 md:px-4">
        <picture className="block overflow-hidden rounded-xl bg-[#eee7dc] md:rounded-2xl">
          <source media="(max-width: 639px)" srcSet={KAWKAB_HERO.mobile_url || KAWKAB_HERO.url}/>
          <img src={KAWKAB_HERO.url} alt={en?'Kawkab Al Saeed company cover':'غلاف كوكب الصعيد للخدمات الفنية'}
            width={KAWKAB_HERO.width} height={KAWKAB_HERO.height} style={{display:'block',width:'100%',height:'auto'}}
            className="block aspect-[16/9] w-full object-cover md:aspect-[3/1]" fetchPriority="high"/>
        </picture>
        <div className="mt-3 flex items-start gap-3 rounded-xl bg-white p-3 md:mt-5 md:gap-5 md:border md:border-[#e8ddcc] md:p-6">
          <img src={KAWKAB_LOGO.url} alt={en?'Company logo':'شعار كوكب الصعيد'} width="512" height="512"
            className="h-14 w-14 shrink-0 rounded-lg border bg-white p-1 object-contain md:h-20 md:w-20"/>
          <div className="min-w-0 flex-1"><span className="text-xs font-semibold text-[#86663e]">{name} · {en?'Registered service area':'منطقة تقديم خدمة مسجلة'}</span>
            <h1 className="mt-1 text-lg font-extrabold leading-7 md:text-3xl">{guide.headline}</h1>
            <p className="mt-2 line-clamp-1 text-xs leading-6 text-[#60564c] md:line-clamp-none md:text-base md:leading-8">{guide.intro}</p>
          </div>
        </div>
        <div className="mt-4 hidden gap-3 sm:flex">
          <a href={kawkabWhatsapp(locale,name)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#273e52] px-6 py-3 text-sm font-bold text-white">{en?'Request a quotation':'طلب عرض سعر'}</a>
          <a href={'tel:+971'+KAWKAB_PROFILE.phone.replace(/^0/,'')} className="rounded-lg border border-[#d5bea1] px-6 py-3 text-sm font-bold">{en?'Call company':'اتصل بالشركة'}</a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-3 py-6 md:px-4 md:py-12">
        <div className="mb-3 md:mb-6"><h2 className="text-lg font-bold md:text-2xl">{en?'Choose a technical specialty':'اختر تخصص كوكب الصعيد'}</h2>
          <p className="mt-2 hidden max-w-3xl text-sm leading-7 text-[#635b51] md:block">{guide.what}</p></div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">
          {KAWKAB_SPECIALTIES.map(service=><Link key={service.id} href={kawkabServicePath(locale,service.id)} className="overflow-hidden rounded-xl border border-[#e6dccd] bg-white">
            <KawkabServiceVisual serviceId={service.id} locale={locale}/>
            <div className="p-3 md:p-4"><h3 className="text-sm font-bold leading-6 md:text-lg">{service[locale]}</h3>
              <p className="mt-2 line-clamp-1 text-xs text-[#625b52] md:line-clamp-none md:text-sm md:leading-7">{service[locale+'Desc']}</p>
              <span className="mt-3 hidden text-sm font-semibold text-[#8c673a] md:block">{en?'Service details':'تفاصيل الخدمة'} ←</span></div>
          </Link>)}
        </div>
        <div className="mt-6 hidden grid-cols-2 gap-4 md:grid">
          <article className="rounded-xl border border-[#e6dccd] bg-white p-5"><h2 className="text-lg font-bold">{en?'What to include in the enquiry':'معلومات تساعد على تحديد نطاق العمل'}</h2><p className="mt-3 text-sm leading-8 text-[#60574d]">{guide.what}</p></article>
          <article className="rounded-xl border border-[#e6dccd] bg-white p-5"><h2 className="text-lg font-bold">{en?'Preparing for a quotation':'تجهيز طلب عرض السعر'}</h2><p className="mt-3 text-sm leading-8 text-[#60574d]">{guide.details}</p></article>
        </div>
        <section className="mt-6" aria-label={en?'Frequently asked questions':'الأسئلة الشائعة'}>
          <h2 className="mb-3 text-lg font-bold md:mb-5 md:text-2xl">{en?'Frequently asked questions':'أسئلة شائعة عن '+name}</h2>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">{faq.map(({q,a})=><div key={q} className="rounded-lg border border-[#e6dccd] bg-white">
            <details className="p-3 md:hidden"><summary className="cursor-pointer text-sm font-bold">{q}</summary><p className="mt-2 text-sm leading-7">{a}</p></details>
            <div className="hidden p-5 md:block"><h3 className="font-bold">{q}</h3><p className="mt-3 text-sm leading-8 text-[#60574d]">{a}</p></div>
          </div>)}</div>
        </section>
        <div className="mt-6 flex flex-wrap gap-2">{KAWKAB_COVERAGE.filter(a=>a.slug!==emirate).map(a=><Link key={a.slug} href={kawkabEmiratePath(locale,a.slug)}
          className="rounded-lg border border-[#daccb8] bg-white px-4 py-2 text-xs font-bold">{a[locale]}</Link>)}</div>
      </section>
    </main><Footer/><KawkabMobileContactBar locale={locale} service={name}/>
  </div>;
}
