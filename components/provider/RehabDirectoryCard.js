import DirectoryCompanyCard from './DirectoryCompanyCard';
import { companyCardFromPresence } from '../../lib/directoryCompanyCards';

export default function RehabDirectoryCard({data,locale='ar',contextHref=null}) {
  const item = companyCardFromPresence(data,locale);
  if (item) item.summary = locale==='en' ? 'Home, villa and upholstery cleaning with professional equipment.' : 'تنظيف المنازل والفلل والمفروشات بالمعدات.';
  if (item && contextHref) {
    item.href = contextHref;
    item.serviceLinks = item.serviceLinks.map(link => ({ ...link, href: `${contextHref}/services/${link.href.split('/').pop()}` }));
  }
  return item ? <DirectoryCompanyCard item={item} locale={locale}/> : null;
}
