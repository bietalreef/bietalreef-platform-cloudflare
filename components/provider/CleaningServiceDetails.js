export default function CleaningServiceDetails({ content, locale = 'ar' }) {
  if (!content) return null;
  const en = locale === 'en';
  return <div className="mt-7 space-y-7 text-slate-700">
    <p className="max-w-4xl text-base leading-8">{content.intro}</p>
    <div className="grid gap-5 md:grid-cols-2">
      <section className="rounded-2xl bg-[#f8f5ed] p-5"><h2 className="text-xl font-bold text-[#17344d]">{en ? 'Discuss your service requirements' : 'خدمة تناسب احتياجك'}</h2><ul className="mt-4 list-inside list-disc space-y-3 leading-7">{content.scope.map(text => <li key={text}>{text}</li>)}</ul></section>
      <section className="rounded-2xl bg-slate-50 p-5"><h2 className="text-xl font-bold text-[#17344d]">{en ? 'Prepare your request' : 'جهّز طلبك بسهولة'}</h2><ul className="mt-4 list-inside list-disc space-y-3 leading-7">{content.prepare.map(text => <li key={text}>{text}</li>)}</ul></section>
    </div>
    <section><h2 className="text-xl font-bold text-[#17344d]">{en ? 'Before your visit' : 'قبل الزيارة'}</h2><p className="mt-3 leading-8">{en ? 'Share your details, review the proposed work and quotation, then agree your appointment and access arrangements with the company.' : 'أرسل تفاصيل طلبك، وراجع الأعمال المقترحة وعرض السعر، ثم اتفق مع الشركة على الموعد وترتيبات الزيارة.'}</p></section>
    <section><h2 className="text-xl font-bold text-[#17344d]">{en ? 'Questions about this service' : 'أسئلة عن الخدمة'}</h2><div className="mt-4 space-y-3">{content.faq.map(([q, a]) => <details key={q} className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-bold text-[#17344d]">{q}</summary><p className="mt-3 leading-8">{a}</p></details>)}</div></section>
  </div>;
}
