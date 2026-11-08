import CompanyContactBar from './CompanyContactBar';
import { KAWKAB_PROFILE, kawkabWhatsapp } from '../../lib/kawkabPresence';

// Preserve the existing Kawkab contact entrypoint for its service and area pages,
// but render the shared company-owned blue mobile actions.
export default function KawkabMobileContactBar({ locale='ar', service='' }) {
  const phone='+971'+KAWKAB_PROFILE.phone.replace(/^0/,'');
  return <CompanyContactBar locale={locale} phoneHref={'tel:'+phone} whatsappHref={kawkabWhatsapp(locale,service)}/>;
}
