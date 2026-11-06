import { UaeDirectoryExploreFooter } from './UaeDirectoryHomeContent';
import UaeProviderJoinCTA from './UaeProviderJoinCTA';

// Keep the provider invitation while avoiding the repeated Abu Dhabi directory panel.
export default function UaeSmartFooter({
  locale = 'ar',
  emirate = null,
  area = null,
  service = null,
  directoryCards = [],
}) {
  return <><UaeProviderJoinCTA locale={locale} emirate={emirate} area={area} service={service} />{emirate?.slug !== 'abu-dhabi' && <UaeDirectoryExploreFooter locale={locale} emirate={emirate} area={area} directoryCards={directoryCards} />}</>;
}
