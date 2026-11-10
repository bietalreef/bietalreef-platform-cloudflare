import DirectoryCompanyCard from './DirectoryCompanyCard';
import { companyCardFromPresence } from '../../lib/directoryCompanyCards';
import { alNaeemPath } from '../../lib/alNaeemPresence';

export default function AlNaeemDirectoryCard({data,locale='ar',whatsappMessage=null,coverageSlug=null,location=null,contextHref=null}) {
  const item = companyCardFromPresence(data,locale);
  if (item && coverageSlug && (data?.coverageAreas||data?.areas||[]).some(area=>area.slug===coverageSlug)) {
    // Same location-aware company card pattern used for Al Rehab, without adding a parallel profile.
    item.href=contextHref||alNaeemPath(locale,{kind:'service-areas',slug:coverageSlug});
    item.serviceLinks=(data.services||[]).slice(0,4).map(service=>({
      name:service[`name_${locale}`]||service.name_ar,
      href:contextHref?contextHref+'/services/'+service.slug:alNaeemPath(locale,{kind:'services',slug:service.slug,areaSlug:coverageSlug}),
    }));
    if(location)item.location=location;
  }
  if (item && whatsappMessage) {
    const number = String(item.whatsapp || '').replace(/\D/g, '');
    if (number.length >= 9 && number.length <= 15) item.whatsapp = `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}`;
  }
  return item ? <DirectoryCompanyCard item={item} locale={locale}/> : null;
}
