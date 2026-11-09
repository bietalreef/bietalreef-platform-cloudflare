import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildServiceQuoteWhatsappUrl } from '../lib/providerWhatsapp';

// One customer-service enquiry per sector page. Service identity stays in the
// approved taxonomy; no parallel request database or invented providers.
export default function DirectorySectorQuoteForm({
  locale = 'ar',
  place = 'أبوظبي',
  specialty = null,
  services = [],
  groups = null,
  requestedService = '',
  pagePath = '',
}) {
  const en = locale === 'en';
  const sourceGroups = groups?.length ? groups : (specialty ? [{ ...specialty, services }] : []);
  const options = sourceGroups.flatMap(group => (group.services || []).map(service => ({
    key: group.slug + ':' + (service.slug || service.id || service.name),
    label: service.name,
    group: group.name,
  })));
  const [selected, setSelected] = useState(options[0]?.key || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (requestedService && options.some(option => option.key === requestedService)) {
      setSelected(requestedService);
    }
  }, [requestedService]);

  if (!options.length) return null;
  const chosen = options.find(option => option.key === selected) || options[0];

  function submit(event) {
    event.preventDefault();
    if (!chosen || !name.trim() || !phone.trim() || details.trim().length < 5) {
      setStatus(en ? 'Complete your contact details and project description.' : 'أكمل الاسم ورقم التواصل وتفاصيل المشروع.');
      return;
    }
    const url = buildServiceQuoteWhatsappUrl({
      phone: '971564456337',
      locale,
      providerName: en ? 'Biet Al Reef customer service' : 'خدمة عملاء بيت الريف',
      serviceName: chosen.label,
      pagePath: pagePath || window.location.pathname,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      location: place,
      details: details.trim(),
    });
    if (!url) {
      setStatus(en ? 'Please check your request details.' : 'راجع بيانات طلبك.');
      return;
    }
    setStatus(en ? 'Check your WhatsApp message and press Send.' : 'راجع الرسالة في واتساب واضغط إرسال لإتمام الطلب.');
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const field = 'mt-1.5 block w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-[#193b53] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100';
  return <section id="directory-quote" className="mx-auto w-full max-w-4xl scroll-mt-36 px-3 pb-10 pt-5 sm:px-4 sm:pb-14" aria-labelledby="directory-quote-title">
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7">
      <h2 id="directory-quote-title" className="text-lg font-extrabold leading-8 text-[#193b53] sm:text-2xl">
        {en ? 'Request a quotation through Biet Al Reef customer service' : 'اطلب عرض سعر عبر خدمة عملاء بيت الريف'}
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        {en ? 'Choose a service and describe your requirements. WhatsApp opens with the information ready for your review; no provider availability or price is implied.' : 'اختر الخدمة المناسبة واكتب تفاصيل طلبك. سنجهّز لك رسالة واتساب لمراجعتها قبل إرسالها لخدمة العملاء، دون افتراض وجود شركة متاحة أو سعر محدد.'}
      </p>
      <form onSubmit={submit} className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2" aria-label={en ? 'Customer-service quotation request' : 'نموذج طلب عرض سعر لخدمة العملاء'}>
        <label className="min-w-0 text-sm font-semibold text-[#193b53] sm:col-span-2">{en ? 'Requested service' : 'الخدمة المطلوبة'}
          <select className={field} value={chosen.key} onChange={event => setSelected(event.target.value)} required>
            {sourceGroups.map(group => <optgroup key={group.slug} label={group.name}>
              {(group.services || []).map(service => <option key={group.slug + ':' + (service.slug || service.id || service.name)} value={group.slug + ':' + (service.slug || service.id || service.name)}>{service.name}</option>)}
            </optgroup>)}
          </select>
        </label>
        <label className="min-w-0 text-sm font-semibold text-[#193b53]">{en ? 'Service area' : 'المنطقة'}
          <input className={field} value={place} readOnly aria-readonly="true" />
        </label>
        <label className="min-w-0 text-sm font-semibold text-[#193b53]">{en ? 'Your name' : 'اسم العميل'}
          <input type="text" autoComplete="name" maxLength={100} required value={name} onChange={event => setName(event.target.value)} className={field} />
        </label>
        <label className="min-w-0 text-sm font-semibold text-[#193b53] sm:col-span-2">{en ? 'Contact number' : 'رقم التواصل'}
          <input type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={22} required value={phone} onChange={event => setPhone(event.target.value)} className={field} />
        </label>
        <label className="min-w-0 text-sm font-semibold text-[#193b53] sm:col-span-2">{en ? 'Your request' : 'تفاصيل الطلب'}
          <textarea className={field + ' min-h-28 resize-y'} minLength={5} maxLength={1200} required value={details} onChange={event => setDetails(event.target.value)} placeholder={en ? 'Property or project, location details, dimensions, scope and any special requirements…' : 'نوع العقار أو المشروع، الموقع، المساحة أو المقاسات، نطاق العمل والمتطلبات الخاصة…'} />
        </label>
        <div className="min-w-0 sm:col-span-2">
          <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#185b87] px-4 py-3 text-sm font-bold leading-6 text-white hover:bg-[#12486b] sm:w-auto sm:px-7">
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{en ? 'Prepare WhatsApp request' : 'تجهيز طلب السعر عبر واتساب'}</span>
          </button>
          <p aria-live="polite" role="status" className="mt-2 text-xs leading-6 text-slate-600">{status}</p>
        </div>
      </form>
    </div>
  </section>;
}
