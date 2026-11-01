import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import KawkabMobileContactBar from './provider/KawkabMobileContactBar';
import KawkabServiceVisual from './provider/KawkabServiceVisual';
import {
 KAWKAB_PROFILE, KAWKAB_SPECIALTIES, KAWKAB_AL_AIN_AREAS,
 KAWKAB_LOGO, KAWKAB_ORIGIN,
 kawkabPath, kawkabWhatsapp, kawkabServicePath, kawkabServiceImage, kawkabAreaServicePath
} from '../lib/kawkabPresence';

const DETAILS={
 painting:{
  ar:{lead:'دهانات داخلية وتشطيبات جدارية تناسب منزلك أو مشروعك.',summary:'تبدأ جودة الدهان من حالة السطح: فحص الشروخ وآثار الرطوبة والطبقات السابقة، ثم تحديد التجهيز الملائم قبل اختيار الدهان النهائي. تساعدك صور الغرف ومساحاتها على توضيح المطلوب ومقارنة تفاصيل عرض السعر.',steps:['فحص حالة الجدران والدهانات القديمة','تحديد معالجة الشروخ وتجهيز السطح','اختيار اللون ودرجة اللمعان والخامة','تأكيد نطاق العمل والحماية والتنظيف'],question:'كيف أحدد عرض سعر الدهانات؟',answer:'أرسل مساحة الغرف أو الجدران، وصور الحالة، وعدد الألوان المطلوبة، ونوع التشطيب والحي.'},
  en:{lead:'Interior painting and wall finishes for homes and projects.',summary:'A good paint finish starts with understanding wall condition, previous coatings, cracks and damp patches. Appropriate preparation and the chosen finish are assessed before quoting. Room dimensions and photographs help define the scope.',steps:['Check walls and old coatings','Agree crack treatment and surface preparation','Choose colour, finish and material','Confirm protection, execution and cleanup'],question:'What is needed for a painting quote?',answer:'Share wall dimensions, condition photos, desired colours and the district.'}},
 plaster:{
  ar:{lead:'بلاستر وتجهيز أسطح قبل الدهانات والتشطيبات.',summary:'تسوية الجدران وتجهيز الأسطح مرحلة مهمة قبل الدهان أو ورق الجدران. تختلف المعالجة حسب تماسك الطبقة القديمة، واستقامة الحائط، والشروخ، وحالة الرطوبة. اطلب تحديد البنود المطلوبة قبل اختيار الخامات.',steps:['فحص استقامة الحوائط', 'مراجعة الطبقات القائمة', 'تحديد أعمال التسوية والمعالجة', 'تأكيد جاهزية السطح للتشطيب'],question:'متى أحتاج إلى بلاستر جديد؟',answer:'يعتمد القرار على استقامة السطح وحالة طبقاته؛ أرسل صورًا قريبة ومساحة الموقع لبحث المعالجة المناسبة.'},
  en:{lead:'Plaster and wall preparation before finishing.',summary:'Surface levelling and preparation affect the final look of painting and wallpaper. Assessment depends on old plaster adhesion, surface alignment, cracks and moisture conditions.',steps:['Inspect surface alignment','Assess existing layers','Specify levelling and repairs','Confirm readiness for finishing'],question:'When is new plaster required?',answer:'It depends on the substrate condition. Share close-up photos and wall measurements.'}},
 wallpaper:{
  ar:{lead:'ورق جدران يمنح المساحات هوية مختلفة.',summary:'اختيار ورق الجدران يبدأ من مساحة الغرفة وطبيعة الجدار والإضاءة، ثم مراجعة نوع الورق ونمط النقشة وطريقة التركيب. القياسات الدقيقة وتجهيز الأسطح يساعدان على الوصول إلى نتيجة متناسقة.',steps:['قياس عرض وارتفاع الجدار','اختيار التصميم ونوع الورق','تجهيز السطح وفحص الرطوبة','تحديد الوصلات والتشطيبات النهائية'],question:'هل يمكن تركيب ورق الجدران على أي سطح؟',answer:'لا بد من مراجعة استواء السطح وجفافه ونوع الورق قبل تحديد طريقة التركيب.'},
  en:{lead:'Wallpaper installation for coordinated interiors.',summary:'Wallpaper selection depends on room dimensions, substrate, lighting and pattern repeat. Accurate measurements and surface preparation help achieve a consistent finish.',steps:['Measure wall dimensions','Select paper and pattern','Check surface and moisture','Agree seams and finishing'],question:'Is wallpaper suitable for any wall?',answer:'The surface needs checking for flatness, dryness and material compatibility.'}},
 plumbing:{
  ar:{lead:'أعمال سباكة وتمديدات صحية للمنازل والمباني.',summary:'عند طلب أعمال السباكة، حدد هل المطلوب تركيب أدوات صحية أو تمديدات أو صيانة جزء قائم. تصوير الموقع وتوضيح الأعراض والمقاسات يساعد على حصر المواد ونطاق العمل وتحديد خطوات الفحص.',steps:['تحديد موقع العطل أو العمل المطلوب','حصر الأدوات الصحية والتمديدات','مراجعة الوصول إلى نقاط المياه والصرف','تأكيد المواد والاختبار بعد التنفيذ'],question:'ما المعلومات المهمة لطلب صيانة سباكة؟',answer:'اذكر المشكلة وموقعها وأرفق الصور، مع توضيح نوع الأدوات الصحية والمنطقة.'},
  en:{lead:'Plumbing installation and sanitary maintenance.',summary:'Specify whether you need sanitary fixtures, plumbing lines or maintenance of an existing installation. Photos and measurements help scope materials and diagnostic work.',steps:['Identify the fixture or issue','List connections and sanitary items','Review water and drainage access','Agree materials and final checks'],question:'What should I share for a plumbing request?',answer:'Describe the issue, send photographs and identify the location and fixtures.'}},
 carpentry:{
  ar:{lead:'أعمال نجارة وتجديد وتنسيق التشطيبات الخشبية.',summary:'تشمل الأعمال الخشبية تركيب القطع والتشطيبات المناسبة لمساحة البيت أو المكتب، مع مراعاة المقاسات ونوع الخشب والتفاصيل المطلوبة. تساعد صور الموقع والمقاسات على إعداد عرض سعر أوضح.',steps:['قياس المساحة ومراجعة فتحات الموقع','اختيار الخامة والتشطيب','تحديد المقاسات ونقاط التثبيت','مراجعة التسليم والملحقات'],question:'كيف أطلب عرض سعر لعمل خشبي؟',answer:'أرسل رسمة تقريبية أو صورة مرجعية والمقاسات والخامة المطلوبة ومنطقة العمل.'},
  en:{lead:'Carpentry, woodwork and coordinated interior finishes.',summary:'Woodwork requires accurate dimensions, suitable materials, installation details and clear finishing specifications for the intended space.',steps:['Measure the space','Select material and finish','Confirm fitting and fixing details','Agree delivery and accessories'],question:'What is needed for a carpentry quote?',answer:'Share dimensions, reference photos or sketches, material preferences and location.'}},
 hvac:{
  ar:{lead:'تركيب وصيانة التكييف والتهوية.',summary:'تحديد نوع الوحدة والعطل أو احتياج التركيب يساعد في اختيار خطوات الفحص المناسبة. اذكر قدرة الجهاز إن كانت معروفة وصور الموقع وأعراض المشكلة، مع التأكد من نطاق قطع الغيار والصيانة قبل بدء العمل.',steps:['تحديد نوع جهاز التكييف وموقعه','وصف العطل أو متطلبات التركيب','مراجعة نقاط الوصول والتمديدات','تأكيد الفحص والمواد وقطع الغيار'],question:'هل يمكن معرفة سعر صيانة التكييف من الصورة؟',answer:'تساعد الصورة في فهم النوع والموقع، لكن فحص الجهاز قد يكون ضروريًا لتحديد السبب والتكلفة.'},
  en:{lead:'Air-conditioning and ventilation installation and maintenance.',summary:'The equipment type, fault symptoms and installation requirements guide a suitable assessment. Share unit information, photos and site access details.',steps:['Identify equipment and location','Describe the fault or installation','Review access and connections','Agree inspection, materials and parts'],question:'Can AC repair pricing be set from a photo?',answer:'Photos help identify the equipment, but diagnosis may require inspection before a final quote.'}}
};

export default function KawkabServicePage({locale='ar',serviceId}){
 const en=locale==='en',d=en?'en':'ar',service=KAWKAB_SPECIALTIES.find(x=>x.id===serviceId);
 if(!service)return null;
 const copy=DETAILS[serviceId][d],path=kawkabServicePath(d,serviceId),image=kawkabServiceImage(serviceId);
 const pageTitle=`${service[d]} | ${KAWKAB_PROFILE[en?'nameEn':'nameAr']} | ${en?'Biet Al Reef':'بيت الريف'}`;
 const desc=`${copy.lead} ${copy.summary}`.slice(0,225),url=KAWKAB_ORIGIN+path;
 const schema={'@context':'https://schema.org','@graph':[
 {'@type':'Service','@id':url+'#service',name:service[d],description:copy.summary,serviceType:service[d],provider:{'@type':'HomeAndConstructionBusiness',name:KAWKAB_PROFILE.nameAr,url:KAWKAB_ORIGIN+kawkabPath('ar'),telephone:'+971556485364'},areaServed:{'@type':'Place',name:'Al Ain, Abu Dhabi, UAE'}},
 {'@type':'BreadcrumbList',itemListElement:[{ '@type':'ListItem',position:1,name:en?'Companies':'الشركات',item:KAWKAB_ORIGIN+(en?'/en/providers':'/providers')},{'@type':'ListItem',position:2,name:KAWKAB_PROFILE[en?'nameEn':'nameAr'],item:KAWKAB_ORIGIN+kawkabPath(d)},{'@type':'ListItem',position:3,name:service[d],item:url}]}
 ]};
 return <div dir={en?'ltr':'rtl'} lang={d} className="min-h-screen bg-[#fbfaf7] pb-20 text-[#29251f] sm:pb-0">
 <Head><title>{pageTitle}</title><meta name="description" content={desc}/><meta name="robots" content="index, follow, max-image-preview:large"/><link rel="canonical" href={url}/><link rel="alternate" hrefLang="ar-AE" href={KAWKAB_ORIGIN+kawkabServicePath('ar',serviceId)}/><link rel="alternate" hrefLang="en-AE" href={KAWKAB_ORIGIN+kawkabServicePath('en',serviceId)}/><meta property="og:image" content={KAWKAB_ORIGIN+image.url}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></Head>
 <Navbar/>
 <main className="mx-auto max-w-6xl px-3 py-4 md:px-5 md:py-9">
 <nav className="mb-3 flex flex-wrap gap-2 text-xs text-[#776b59] md:mb-7"><Link href={kawkabPath(d)}>{KAWKAB_PROFILE[en?'nameEn':'nameAr']}</Link><span>/</span><Link href={kawkabPath(d,'services')}>{en?'Services':'الخدمات'}</Link><span>/</span><span>{service[d]}</span></nav>
 <section className="grid gap-3 rounded-2xl bg-white p-3 shadow-sm md:grid-cols-2 md:gap-7 md:p-7">
 <div><span className="text-xs font-semibold text-[#9b7b42]">{KAWKAB_PROFILE[en?'nameEn':'nameAr']} · {en?'Verified on Biet Al Reef':'نشاط موثق على بيت الريف'}</span><h1 className="mt-2 text-xl font-extrabold md:mt-4 md:text-4xl">{service[d]}</h1>
 <p className="mt-2 text-sm leading-6 text-[#62574a] md:hidden">{copy.lead}</p>
 <p className="mt-4 hidden text-base leading-8 text-[#62574a] md:block">{copy.summary}</p>
 <div className="mt-3 hidden gap-2 sm:flex md:mt-6"><a href={kawkabWhatsapp(d,service[d])} target="_blank" rel="noopener noreferrer" className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#353027] px-3 text-sm font-bold text-white">{en?'Request quote':'اطلب عرض سعر'}</a><a href="tel:+971556485364" className="flex min-h-11 items-center rounded-xl border px-4 text-sm font-bold">{en?'Call':'اتصال'}</a></div>
 </div>
 <KawkabServiceVisual serviceId={serviceId} locale={d} className="rounded-xl"/>
 </section>
 <section className="mt-5 hidden md:block"><h2 className="text-2xl font-bold">{en?'What the service involves':'تفاصيل الخدمة وخطوات المعاينة'}</h2><p className="mt-3 max-w-4xl leading-8 text-[#655d52]">{copy.summary}</p><div className="mt-5 grid gap-3 md:grid-cols-4">{copy.steps.map((step,i)=><article className="rounded-xl border bg-white p-4" key={step}><span className="text-xs font-bold text-[#a0824b]">{String(i+1).padStart(2,'0')}</span><h3 className="mt-2 font-semibold">{step}</h3></article>)}</div></section>
 <section className="mt-5 md:mt-9"><h2 className="mb-3 text-lg font-bold md:text-2xl">{en?'Select your district in Al Ain':'اختر منطقتك في العين'}</h2><div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">{KAWKAB_AL_AIN_AREAS.map(area=><Link key={area.slug} href={kawkabAreaServicePath(d,area.slug,serviceId)} className="rounded-lg border bg-white px-3 py-3 text-center text-xs font-semibold md:text-sm">{area[d]}</Link>)}</div></section>
 <section id="service-faq" className="mt-6" aria-label={en?'Frequently asked questions':'الأسئلة الشائعة'}>
 <h2 className="mb-3 text-lg font-bold md:text-2xl">{en?'Frequently asked questions':'الأسئلة الشائعة عن '+service.ar}</h2>
 <details className="rounded-xl border bg-white p-3 text-sm md:hidden"><summary className="cursor-pointer font-bold">{copy.question}</summary><p className="mt-2 leading-7 text-[#655d52]">{copy.answer}</p></details>
 <div className="hidden rounded-xl border bg-white p-6 md:block"><h3 className="font-bold">{copy.question}</h3><p className="mt-3 leading-8 text-[#655d52]">{copy.answer}</p></div>
 <details className="mt-2 rounded-xl border bg-white p-3 text-sm md:hidden"><summary className="cursor-pointer font-bold">{en?'What details should I send to request a quote?':'ما المطلوب لإعداد عرض سعر لهذه الخدمة؟'}</summary><p className="mt-2 leading-7">{en?'Send the site location, approximate measurements, photos and a short description of the work.':'أرسل منطقة العقار والمقاسات التقريبية وصور الموقع مع وصف واضح للعمل المطلوب.'}</p></details>
 </section>
 <div className="mt-6 flex flex-wrap gap-3"><Link className="text-sm font-semibold text-[#81622c] underline" href={kawkabPath(d)}>{en?'Company profile':'الملف الرئيسي'}</Link><Link className="text-sm font-semibold text-[#81622c] underline" href={kawkabPath(d,'gallery')}>{en?'Explore the gallery':'معرض التشطيبات'}</Link></div>
 </main><Footer/><KawkabMobileContactBar locale={d} service={service[d]}/></div>;
}
export async function kawkabServiceProps(locale,serviceId){
 if(!KAWKAB_SPECIALTIES.some(item=>item.id===serviceId))return {notFound:true};
 return {props:{locale,serviceId}};
}
