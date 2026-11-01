import { KAWKAB_SERVICE_MEDIA, KAWKAB_IMAGES, KAWKAB_LOGO } from '../../lib/kawkabPresence';

// Only use media that actually represents the named specialty. The current
// provider gallery contains finishing photos, but no plumbing/AC job photos.
export default function KawkabServiceVisual({ serviceId, locale='ar', className='' }) {
 const en=locale==='en';
 const matched=KAWKAB_IMAGES.find(item=>item.id===KAWKAB_SERVICE_MEDIA[serviceId]);
 return matched
   ? <img src={matched.url} alt={matched['alt_'+locale] || matched.alt_ar || (en?'Kawkab finishing work':'تشطيبات كوكب الصعيد')} width={matched.width} height={matched.height} loading="lazy" decoding="async" className={`block aspect-[4/3] w-full rounded-lg object-cover ${className}`}/>
   : <div className={`flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-[#f2ebdf] p-4 ${className}`}>
       <img src={KAWKAB_LOGO.url} alt={en?'Kawkab Al Saeed company logo':'شعار كوكب الصعيد'} width="512" height="512" loading="lazy" decoding="async" className="h-24 w-24 max-w-[50%] object-contain md:h-32 md:w-32"/>
     </div>;
}
