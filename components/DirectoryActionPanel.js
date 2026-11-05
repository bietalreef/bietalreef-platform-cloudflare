import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpLeft, Bot, Mic, Search, ShieldCheck, Store } from 'lucide-react';
import { DIRECTORY_SECTORS, UAE_MAIN_SECTORS } from '../data/directoryDiscovery';
import { suggestDirectorySector } from '../lib/directoryGuide';
import styles from './DirectoryActionPanel.module.css';

export function DirectoryAssistant({ locale, onSelectSector }) {
  const en = locale === 'en';
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState(undefined);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('');
  const recognition = useRef(null);
  useEffect(() => {
    setVoiceSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    return () => { if (recognition.current) recognition.current.abort(); };
  }, []);
  const selected = UAE_MAIN_SECTORS.find((sector) => sector.slug === suggestion) || DIRECTORY_SECTORS.find((sector) => sector.slug === suggestion);
  function listen() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || recognition.current) return;
    const listener = new SpeechRecognition();
    recognition.current = listener;
    listener.lang = en ? 'en-AE' : 'ar-AE';
    listener.interimResults = false;
    listener.onresult = (event) => { setInput(event.results[0][0].transcript); setSuggestion(undefined); setVoiceStatus(''); };
    listener.onerror = () => setVoiceStatus(en ? 'Voice input was unavailable. You can type instead.' : 'تعذّر التقاط الصوت، ويمكنك كتابة احتياجك.');
    listener.onend = () => { recognition.current = null; setVoiceStatus((value) => value === (en ? 'Listening…' : 'أستمع إليك…') ? '' : value); };
    try { listener.start(); setVoiceStatus(en ? 'Listening…' : 'أستمع إليك…'); }
    catch { recognition.current = null; setVoiceStatus(en ? 'Voice input was unavailable. You can type instead.' : 'تعذّر التقاط الصوت، ويمكنك كتابة احتياجك.'); }
  }
  return <section className={styles.assistant} aria-labelledby="assistant-heading">
    <div className={styles.intro}><span className={styles.icon}><Bot aria-hidden="true" /></span><div>
      <h2 id="assistant-heading">{en ? 'Not sure where to start? Ask Weyaak' : 'محتار تبدأ من أين؟ وياك يساعدك'}</h2>
      <p>{en ? 'Describe your need for a suggested specialty, then choose your location.' : 'اكتب احتياجك لنقترح التخصص الأقرب، ثم اختر موقعك.'}</p>
    </div></div>
    <form onSubmit={(event) => { event.preventDefault(); setSuggestion(suggestDirectorySector(input)); }} className={styles.form}>
      <label className={styles.sr} htmlFor="directory-assistant-input">{en ? 'Describe your need' : 'اكتب احتياجك'}</label>
      <input id="directory-assistant-input" value={input} onChange={(event) => { setInput(event.target.value); setSuggestion(undefined); }} placeholder={en ? 'For example: a water leak or sofa cleaning' : 'مثال: تسرب مياه أو تنظيف كنب'} />
      {voiceSupported && <button type="button" className={styles.voice} onClick={listen} aria-label={en ? 'Speak your need' : 'تحدث عن احتياجك'}><Mic aria-hidden="true" /></button>}
      <button type="submit" className={styles.submit} disabled={!input.trim()}>{en ? 'Suggest a specialty' : 'اقترح التخصص'}<Search aria-hidden="true" /></button>
    </form>
    {voiceSupported && <p className={styles.voiceNote}>{en ? 'Voice input depends on your browser and may be processed by its speech service.' : 'الإدخال الصوتي حسب دعم المتصفح وقد تعالجه خدمة الصوت الخاصة به.'}</p>}
    <div className={styles.result} role="status" aria-live="polite">{voiceStatus || (suggestion !== undefined && (selected ? <>{en ? 'Suggested specialty: ' : 'التخصص المقترح: '}<strong>{selected.name[locale]}</strong> {selected.slug==='hourly-cleaning'?<Link href={`${en?'/en':''}/uae/abu-dhabi/al-ain/hourly-cleaning`}>{en?'Explore this service':'استكشف هذه الخدمة'} <ArrowUpLeft aria-hidden="true"/></Link>:<button type="button" onClick={() => onSelectSector(selected.slug)}>{en ? 'Choose location' : 'اختر الموقع'} <ArrowUpLeft aria-hidden="true" /></button>}</> : (en ? 'No clear match yet. Choose a specialty below or ask customer service.' : 'لم نجد تخصصًا واضحًا بعد. اختر من الأقسام أدناه أو تواصل مع خدمة العملاء.')))}</div>
    <div className={styles.quick} aria-label={en ? 'Popular specialties' : 'تخصصات شائعة'}>{['cleaning-services', 'general-maintenance', 'general-contracting', 'building-materials'].map((slug) => {
      const item = UAE_MAIN_SECTORS.find((sector) => sector.slug === slug);
      return <button type="button" key={slug} onClick={() => onSelectSector(slug)}>{item.name[locale]}</button>;
    })}</div>
    <p className={styles.fullAssistant}><Link href={`${en ? '/en' : ''}/weyaak`}>{en ? 'Discover Weyaak in the app' : 'تعرّف على وياك في التطبيق'}</Link></p>
  </section>;
}

export function DirectoryTrustAndBusiness({ locale }) {
  const en = locale === 'en';
  const prefix = en ? '/en' : '';
  const steps = en ? [
    ['Check the business', 'Ask for the trade licence and check its activity and validity with the relevant authority.'],
    ['Agree the scope', 'Request written quantities, materials, exclusions, schedule and payment terms.'],
    ['Document handover', 'Agree inspection, handover and warranty terms before work begins.'],
  ] : [
    ['تحقق من المنشأة', 'اطلب الرخصة التجارية وتحقق من النشاط وسريانها لدى الجهة المختصة.'],
    ['اتفق على النطاق', 'اطلب كتابة الكميات والمواد والاستثناءات والمدة وشروط الدفع.'],
    ['وثّق الاستلام', 'اتفق على الفحص والاستلام والضمان قبل بدء العمل.'],
  ];
  return <section className={styles.guide} aria-label={en ? 'Choosing a business and joining' : 'اختيار الشركة والانضمام'}>
    <div className={styles.trust}><div className={styles.heading}><ShieldCheck aria-hidden="true"/><div><h2>{en ? 'Choose with confidence' : 'خطوات تساعدك على الاختيار بثقة'}</h2><p>{en ? 'A few checks make it easier to compare offers.' : 'مراجعة بسيطة تساعدك في مقارنة العروض قبل الاتفاق.'}</p></div></div>
      <div className={styles.steps}>{steps.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <Link className={styles.link} href={`${prefix}/request-quote`}>{en ? 'Prepare a quotation request' : 'جهّز طلب عرض سعر'} <ArrowUpLeft aria-hidden="true" /></Link>
    </div>
    <div className={styles.business}><div className={styles.heading}><Store aria-hidden="true"/><div><h2>{en ? 'Own a business or supply materials?' : 'صاحب شركة أو محل أو مورد؟'}</h2><p>{en ? 'Present your activity, specialties and the areas you serve on Biet Al Reef.' : 'عرّف العملاء بنشاطك وتخصصاتك ومناطق الخدمة عبر بيت الريف.'}</p></div></div><Link className={styles.link} href={`${prefix}/join-provider`}>{en ? 'Explore joining' : 'تعرّف على الانضمام'} <ArrowUpLeft aria-hidden="true" /></Link></div>
  </section>;
}
