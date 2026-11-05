import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Keep the full description in the page while showing just one line initially.
export default function CompactDescription({ text, locale = 'ar', className = '', mobileOnly = false }) {
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(true);
  const paragraph = useRef(null);
  const id = useId();
  const en = locale === 'en';
  useEffect(() => {
    const node = paragraph.current;
    if (!node || expanded) return;
    const measure = () => setOverflow(node.scrollHeight > node.clientHeight + 1);
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(node);
    window.addEventListener('resize', measure);
    return () => { observer?.disconnect(); window.removeEventListener('resize', measure); };
  }, [text, expanded]);
  if (!text) return null;
  return <div className={`flex min-w-0 items-start gap-1 ${className}`}>
    <p ref={paragraph} id={id} className={`min-w-0 flex-1 text-xs leading-6 text-slate-600 sm:text-sm ${expanded ? '' : mobileOnly ? 'line-clamp-1 md:line-clamp-none' : 'line-clamp-1'}`}>{text}</p>
    {(overflow || expanded) && <button type="button" aria-expanded={expanded} aria-controls={id} aria-label={expanded ? (en ? 'Hide description' : 'إخفاء الوصف') : (en ? 'Show description' : 'عرض الوصف')} onClick={() => setExpanded(value => !value)} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#806338] hover:bg-[#f8f4ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><ChevronDown size={18} aria-hidden="true" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}/></button>}
  </div>;
}
