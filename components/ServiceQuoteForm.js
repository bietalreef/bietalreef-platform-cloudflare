import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildServiceQuoteWhatsappUrl } from '../lib/providerWhatsapp';

// This uses the company's existing contact channel; no second request store.
export default function ServiceQuoteForm({ item }) {
  const en = item.locale === 'en';
  const [form, setForm] = useState({ name: '', location: '', details: '', date: '' });
  const [message, setMessage] = useState('');
  const change = (key) => (event) => setForm(previous => ({ ...previous, [key]: event.target.value }));
  function submit(event) {
    event.preventDefault();
    const url = buildServiceQuoteWhatsappUrl({ phone: item.providerWhatsappNumber, locale: item.locale,
      providerName: item.providerName, serviceName: item.name, pagePath: item.href,
      customerName: form.name, location: form.location, details: form.details, preferredDate: form.date });
    if (!url) { setMessage(en ? 'Please complete the location and request details.' : 'أكمل الموقع وتفاصيل الطلب من فضلك.'); return; }
    setMessage(en ? 'Review the message in WhatsApp and press send to contact the company.' : 'راجع الرسالة في واتساب واضغط إرسال للتواصل مع الشركة.');
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  if (!item.providerWhatsapp || !item.providerWhatsappNumber) return null;
  const input = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100';
  return <section id="request-quote" className="mt-7 rounded-2xl border border-sky-200 bg-sky-50 p-5 md:p-8" aria-labelledby="quote-title">
    <h2 id="quote-title" className="text-xl font-extrabold text-[#193b53] md:text-2xl">{en ? 'Request a quotation' : 'اطلب عرض سعر'}</h2>
    <p className="mt-2 text-sm leading-7 text-slate-700">{en ? `Your request will open in ${item.providerName}'s WhatsApp. You can review it and attach photos before sending.` : `سيفتح طلبك في واتساب ${item.providerName}؛ يمكنك مراجعته وإرفاق الصور قبل الإرسال.`}</p>
    <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
      <label className="text-sm font-bold text-slate-800">{en ? 'Name (optional)' : 'الاسم (اختياري)'}<input className={input} autoComplete="name" maxLength={100} value={form.name} onChange={change('name')}/></label>
      <label className="text-sm font-bold text-slate-800">{en ? 'City / area' : 'المدينة / المنطقة'} <span aria-hidden="true">*</span><input className={input} required maxLength={120} value={form.location} onChange={change('location')} placeholder={en?'For example: Al Ain, Al Hili':'مثال: العين، الهيلي'}/></label>
      <label className="text-sm font-bold text-slate-800 md:col-span-2">{en ? 'What do you need?' : 'تفاصيل الخدمة المطلوبة'} <span aria-hidden="true">*</span><textarea className={`${input} min-h-28`} required minLength={5} maxLength={1000} value={form.details} onChange={change('details')} placeholder={en?'Describe the items, size, condition and any other details.':'اذكر القطع أو المساحة وحالة المكان وأي تفاصيل تساعد الشركة على التسعير.'}/></label>
      <label className="text-sm font-bold text-slate-800 md:col-span-2">{en ? 'Preferred date (optional)' : 'الموعد المناسب (اختياري)'}<input className={input} maxLength={100} value={form.date} onChange={change('date')} placeholder={en?'For example: next week':'مثال: خلال الأسبوع القادم'}/></label>
      <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#185b87] px-5 py-3 font-bold text-white hover:bg-[#12486b] md:col-span-2"><MessageCircle size={18}/>{en?'Open company WhatsApp':'فتح واتساب الشركة'}</button>
      <p aria-live="polite" className="text-sm leading-6 text-slate-700 md:col-span-2">{message}</p>
    </form>
    <noscript><p className="mt-3 text-sm"><a href={item.providerWhatsapp} className="underline">{en?'Contact the company on WhatsApp':'تواصل مع الشركة عبر واتساب'}</a></p></noscript>
  </section>;
}
