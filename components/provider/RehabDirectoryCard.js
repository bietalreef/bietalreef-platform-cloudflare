import DirectoryCompanyCard from './DirectoryCompanyCard';
import { companyCardFromPresence } from '../../lib/directoryCompanyCards';

export default function RehabDirectoryCard({data,locale='ar'}) {
  const item = companyCardFromPresence(data,locale);
  return item ? <DirectoryCompanyCard item={item} locale={locale}/> : null;
}
