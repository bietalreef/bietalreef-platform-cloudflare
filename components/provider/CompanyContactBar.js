import {MessageCircle,Phone} from 'lucide-react';

// Shared mobile call/WhatsApp actions; the platform support bubble is already
// suppressed on company landings in pages/_app.js.
export default function CompanyContactBar({locale='ar',phoneHref,whatsappHref}) {
  if(!phoneHref&&!whatsappHref)return null;
  const en=locale==='en';
  const style='flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#193b53] px-2 py-2 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#193b53]';
  return <nav aria-label={en?'Contact the company':'التواصل المباشر مع الشركة'} className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[#d8e2e9] bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-5px_20px_rgba(18,42,73,.10)] backdrop-blur-lg sm:hidden">
    {phoneHref?<a href={phoneHref} className={style}><Phone size={18} aria-hidden="true"/>{en?'Call now':'اتصل الآن'}</a>:null}
    {whatsappHref?<a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={style}><MessageCircle size={18} aria-hidden="true"/>{en?'WhatsApp':'واتساب'}</a>:null}
  </nav>;
}
