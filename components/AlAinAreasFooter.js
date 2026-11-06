import { AREAS } from '../data/localServices';
import { localPath } from '../lib/localServices';
import CompactAreaLinks from './CompactAreaLinks';

export default function AlAinAreasFooter({ locale = 'ar', anchorId }) {
  const en = locale === 'en';
  const city = localPath({ locale });
  return <div data-al-ain-footer="true"><CompactAreaLinks id={anchorId} locale={locale} title={en ? 'Al Ain areas' : 'مناطق العين'} areas={AREAS} basePath={city} headingHref={city}/></div>;
}
