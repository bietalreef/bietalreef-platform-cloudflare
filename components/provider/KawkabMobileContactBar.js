import { MessageCircle, Phone } from 'lucide-react';
import { KAWKAB_PROFILE, kawkabWhatsapp } from '../../lib/kawkabPresence';

/**
 * Company's own action bar, distinct from Biet Al Reef's global customer-support
 * WhatsApp. Kept on every company landing and its service pages.
 */
export default function KawkabMobileContactBar({ locale = 'ar', service = '' }) {
  const en = locale === 'en';
  const phone = '+971' + KAWKAB_PROFILE.phone.replace(/^0/, '');
  const whatsapp = kawkabWhatsapp(locale, service);
  return <nav aria-label={en ? 'Contact Kawkab Al Saeed' : 'تواصل مع كوكب الصعيد'}
    className="fixed inset-x-0 bottom-0 z-[70] flex gap-2 border-t border-[#e7dcc8] bg-white/95 px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-[0_-5px_22px_rgba(18,42,73,.10)] backdrop-blur-xl sm:hidden">
    <a href={phone ? 'tel:' + phone : '#'} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#F1E1BE] px-2 py-2 text-sm font-black text-[#122A49]">
      <Phone size={18} aria-hidden="true"/>{en ? 'Call now' : 'اتصل الآن'}
    </a>
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#168E4B] px-2 py-2 text-sm font-black text-white">
      <MessageCircle size={18} aria-hidden="true"/>{en ? 'WhatsApp' : 'تواصل عبر واتساب'}
    </a>
  </nav>;
}
