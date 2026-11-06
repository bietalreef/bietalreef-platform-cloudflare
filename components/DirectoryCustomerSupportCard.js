import { ArrowUpLeft, ArrowUpRight, Headphones } from 'lucide-react';

// Support is presented as support, never as a company offering a particular service.
export default function DirectoryCustomerSupportCard({ locale = 'ar' }) {
  const en = locale === 'en';
  return <article className="rounded-2xl border border-[#e4d8c2] bg-white p-5 text-[#24354b] shadow-sm">
    <div className="flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5fa] text-[#185b87]"><Headphones size={22} aria-hidden="true"/></span>
      <div><h3 className="text-base font-extrabold">{en ? 'Biet Al Reef customer service' : 'خدمة عملاء بيت الريف معك'}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{en ? 'Tell us your location and what you need. Our team can help you prepare your request and check available options.' : 'شاركنا منطقتك والعمل المطلوب، وسيساعدك فريقنا في تجهيز طلبك والتحقق من الخيارات المتاحة.'}</p>
      </div>
    </div>
    <a href="https://wa.me/971564456337" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#185b87] px-4 py-2 text-sm font-bold text-white hover:bg-[#154c70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185b87]">{en ? 'Contact customer service' : 'تواصل مع خدمة العملاء'}{en ? <ArrowUpRight size={16} aria-hidden="true"/> : <ArrowUpLeft size={16} aria-hidden="true"/>}</a>
  </article>;
}
