import { ArrowUpLeft, ArrowUpRight, Headphones } from 'lucide-react';

// Support is presented as support, never as a company offering a particular service.
export default function DirectoryCustomerSupportCard({ locale = 'ar', place = '' }) {
  const en = locale === 'en';
  const locationMessage=place?(en?`Hello Biet Al Reef customer service, I need assistance arranging a service quotation in ${place}.`:`مرحبًا خدمة عملاء بيت الريف، أريد تجهيز طلب عرض سعر لخدمة في ${place}.`):'';
  const whatsappHref=locationMessage?`https://wa.me/971564456337?text=${encodeURIComponent(locationMessage)}`:'https://wa.me/971564456337';
  return <article className="rounded-2xl border border-[#e4d8c2] bg-white p-5 text-[#24354b] shadow-sm">
    <div className="flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5fa] text-[#185b87]"><Headphones size={22} aria-hidden="true"/></span>
      <div><h3 className="text-base font-extrabold">{en ? 'Biet Al Reef customer service' : 'خدمة عملاء بيت الريف معك'}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{place?(en?`Tell us about the service you need in ${place}. Our team can help structure your request without claiming that a provider is already available.`:`شاركنا تفاصيل الخدمة المطلوبة في ${place}، وسيساعدك فريقنا في تجهيز الطلب دون افتراض وجود شركة متاحة مسبقًا.`):(en ? 'Tell us your location and what you need. Our team can help you prepare your request and check available options.' : 'شاركنا منطقتك والعمل المطلوب، وسيساعدك فريقنا في تجهيز طلبك والتحقق من الخيارات المتاحة.')}</p>
      </div>
    </div>
    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#185b87] px-4 py-2 text-sm font-bold text-white hover:bg-[#154c70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185b87]">{en ? 'Contact customer service' : 'تواصل مع خدمة العملاء'}{en ? <ArrowUpRight size={16} aria-hidden="true"/> : <ArrowUpLeft size={16} aria-hidden="true"/>}</a>
  </article>;
}
