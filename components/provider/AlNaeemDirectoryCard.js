import DirectoryCompanyCard from './DirectoryCompanyCard';
import { companyCardFromPresence } from '../../lib/directoryCompanyCards';

export default function AlNaeemDirectoryCard({data,locale='ar',contextHref=null,whatsappMessage=null}) {
  const item = companyCardFromPresence(data,locale);
  if (item && contextHref) {
    item.href = contextHref;
    item.serviceLinks = item.serviceLinks.map(link=>({...link,href:`${contextHref}/services/${link.href.split('/').pop()}`}));
  }
  if (item && whatsappMessage) {
    const number = String(item.whatsapp || '').replace(/\D/g, '');
    if (number.length >= 9 && number.length <= 15) item.whatsapp = `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}`;
  }
  return item ? <DirectoryCompanyCard item={item} locale={locale}/> : null;
}
