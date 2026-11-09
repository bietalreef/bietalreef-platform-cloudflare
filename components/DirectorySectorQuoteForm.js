import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildServiceQuoteWhatsappUrl } from '../lib/providerWhatsapp';

// Reuses the existing WhatsApp quotation formatter and the approved customer-service number.
// This is a pre-filled customer-support enquiry, never a claim that a contractor is available.
export default function DirectorySectorQuoteForm({ locale = 'ar', place = 'أبوظبي', specialty, services = [], requestedService = '', pagePath = '' }) {
  const en = locale === 'en';
  const [selected, setSelected] = useState(services[0]?.name || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');
  const formId = 'quote-' + specialty.slug;
  useEffect(() => { if (requestedService && services.some(item=>item.name===requestedService)) setSelected(requestedService); }, [requestedService, services]);
  function submit(event) {
    event.preventDefault();
    if (!selected || !name.trim() || !phone.trim() || details.trim().length < 5) {
      setStatus(en ? 'Complete your contact details and project description.' : 'أكمل الاسم ورقم التواصل وتفاصيل المشروع.');
      return;
    }
    const url = buildServiceQuoteWhatsappUrl({
      phone: '971564456337',
      locale,
      providerName: en ? 'Biet Al Reef customer service' : 'خدمة عملاء بيت الريف',
      serviceName: selected,
      pagePath: pagePath || window.location.pathname,
      customerName: name,
      customerPhone: phone,
      location: place,
      details,
    });
    if (!url) {
      setStatus(en ? 'Check the request details.' : 'راجع تفاصيل الطلب.');
      return;
    }
    setStatus(en ? 'Review your message in WhatsApp and press Send.' : 'راجع رسالة واتساب ثم اضغط إرسال لإتمام الطلب.');
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  const field = 'mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100';
  return <div id={formId} className="mt-5 scroll-mt-28 border-t border-slate-200 pt-4">
    <h4 className="text-base font-extrabold text-[#193b53]">{en ? 'Request a quotation through Biet Al Reef' : 'اطلب عرض سعر عبر خدمة عملاء بيت الريف'}</h4>
    <p className="mt-1 text-xs leading-6 text-slate-600">{en ? 'Choose the exact service. Your details will open in customer-service WhatsApp; sending remains your choice. Provider availability is not guaranteed.' : 'اختر الخدمة وحدّد تفاصيل مشروعك. تُجهّز رسالة إلى واتساب خدمة العملاء، ولا يُفترض وجود مقاول متاح أو سعر محدد.'}</p>
    <form onSubmit={submit} className="mt-3 grid gap-3" aria-label={en ? 'Customer-service quotation request' : 'نموذج طلب عرض سعر لخدمة العملاء'}>
      <label className="text-xs font-bold text-slate-800">{en ? 'Service' : 'الخدمة'}
        <select className={field} value={selected} onChange={e=>setSelected(e.target.value)} required>
          {services.map(service=><option key={service.id||service.slug} value={service.name}>{service.name}</option>)}
        </select>
      </label>
      <label className="text-xs font-bold text-slate-800">{en ? 'Area' : 'المنطقة'}
        <input className={field} value={place} readOnly aria-readonly="true"/>
      </label>
      <label className="text-xs font-bold text-slate-800">{en ? 'Your name' : 'اسم العميل'}
        <input type="text" autoComplete="name" maxLength={100} required value={name} onChange={e=>setName(e.target.value)} className={field}/>
      </label>
      <label className="text-xs font-bold text-slate-800">{en ? 'Contact number' : 'رقم التواصل'}
        <input type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={22} required value={phone} onChange={e=>setPhone(e.target.value)} className={field}/>
      </label>
      <label className="text-xs font-bold text-slate-800">{en ? 'Project details' : 'تفاصيل المشروع'}
        <textarea className={field + ' min-h-24'} minLength={5} maxLength={1200} required value={details} onChange={e=>setDetails(e.target.value)} placeholder={en ? 'Type of property, dimensions, location details, existing drawings, proposed work…' : 'نوع العقار، المقاسات، موقع العمل، المخططات المتاحة، والاحتياج الفعلي…'}/>
      </label>
      <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#185b87] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#12486b]"><MessageCircle size={17} aria-hidden="true"/>{en ? 'Prepare WhatsApp request' : 'تجهيز رسالة واتساب لخدمة العملاء'}</button>
      <p aria-live="polite" role="status" className="text-xs leading-5 text-slate-600">{status}</p>
    </form>
  </div>;
}
