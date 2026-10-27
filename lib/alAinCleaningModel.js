import { CLEANING_SERVICES, CLEANING_HUB, CLEANING_REVIEWED_AT } from '../data/alAinCleaningGuide.js';
import { AREAS } from '../data/localServices.js';
import { eligibleProviders, localPath, alternates } from './localServices.js';

export function alAinCleaningModel({locale='ar',service,providers=[]}) {
  if (!['ar','en'].includes(locale)) return null;
  const guide = service ? CLEANING_SERVICES.find(item=>item.slug===service) : CLEANING_HUB;
  if (!guide) return null;
  const category = 'cleaning-services';
  const paths = alternates({category,service});
  const selected = eligibleProviders(providers,{category,service});
  // Related companies are not asserted to offer this exact service. A service-specific
  // listing becomes indexable only after a matching platform service is published.
  const relatedProviders = service && !selected.length ? eligibleProviders(providers,{category}) : [];
  const en = locale==='en';
  const heading = guide.title[locale] + (service ? (en?' in Al Ain':' في العين'):'');
  return {
    cleaningGuide:true, locale, category, service:service||null,
    title:heading+' | '+(en?'Biet Alreef':'بيت الريف'), heading,
    description:guide.intro[locale], canonical:paths[locale], alternates:paths,
    // A reviewed editorial page may be indexed only when an approved provider
    // has a published platform-channel service and verified Al Ain coverage.
    // No provider / unpublished service => remain noindex.
    indexable:selected.length>0, guide, providers:selected, relatedProviders, areas:AREAS,
    reviewedAt:CLEANING_REVIEWED_AT,
    breadcrumbs:[{name:en?'Al Ain':'العين',href:localPath({locale})},{name:en?'Cleaning':'التنظيف',href:localPath({locale,category})},...(service?[{name:guide.title[locale],href:localPath({locale,category,service})}]:[])],
    schema:{'@context':'https://schema.org','@type':service?'WebPage':'CollectionPage','@id':paths[locale]+'#page',url:paths[locale],name:heading,description:guide.intro[locale],inLanguage:en?'en-AE':'ar-AE',about:{'@type':'Thing',name:heading},mainEntity:{'@type':'ItemList',itemListElement:(service?selected:CLEANING_SERVICES).map((item,i)=>({'@type':'ListItem',position:i+1,name:service?item.name[locale]:item.title[locale],url:service?'https://bietalreef.ae'+(en?'/en':'')+'/providers/'+item.slug:'https://bietalreef.ae'+localPath({locale,category,service:item.slug})}))}}
  };
}
