import { useRouter } from 'next/router';
import { MessageCircle } from 'lucide-react';

const OFFICIAL_WHATSAPP = '971564456337';

export default function FloatingWhatsAppSupport({ locale = 'ar' }) {
  const router = useRouter();
  const isEn = locale === 'en';
  const currentPath = (router.asPath || '/').split(/[?#]/)[0];
  const isSectorDirectory = /^\/(?:en\/)?uae\/(?:abu-dhabi|dubai)\/(?:general-contracting|interior-design|general-maintenance|building-materials|aluminium-glass|furniture-decor|equipment-rental|cleaning-services)\/?$/.test(currentPath);
  const title = typeof document !== 'undefined'
    ? (document.title || (isEn ? 'Biet Al Reef' : 'بيت الريف'))
    : (isEn ? 'Biet Al Reef' : 'بيت الريف');
  const pageUrl = typeof window !== 'undefined' ? window.location.href : router.asPath || '/';
  const message = isEn
    ? `Hello Weyaak, I need help with:\n${title}\n${pageUrl}`
    : `مرحباً وياك، أحتاج مساعدة بخصوص:\n${title}\n${pageUrl}`;
  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isEn ? 'Chat with Weyaak on WhatsApp' : 'تحدث مع وياك عبر واتساب'}
      data-analytics-action="whatsapp_support"
      className={`fixed z-40 flex items-center justify-center rounded-full text-white ring-2 ring-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${isSectorDirectory ? 'bottom-3 right-3 h-11 w-11 bg-[#193b53] shadow-md sm:bottom-5 sm:right-5 sm:h-12 sm:w-12' : 'bottom-5 right-5 h-14 w-14 bg-[#25D366] shadow-lg'}`}
      title={isEn ? 'Weyaak on WhatsApp' : 'وياك عبر واتساب'}
    >
      <MessageCircle className={isSectorDirectory ? "h-5 w-5" : "h-7 w-7"} aria-hidden="true" />
    </a>
  );
}
