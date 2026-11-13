import { CLEANING_SERVICES, CLEANING_HUB, CLEANING_REVIEWED_AT } from '../data/alAinCleaningGuide.js';
import { AREAS } from '../data/localServices.js';
import { eligibleProviders, localPath, alternates } from './localServices.js';

function hasReviewedCleaningGuide(guide) {
  // The editorial guide is independent of company publication; do not infer
  // business availability from the existence of a guide.
  return Boolean(
    CLEANING_REVIEWED_AT &&
    guide?.intro?.ar?.trim() && guide?.intro?.en?.trim() &&
    Array.isArray(guide.sections) && guide.sections.length >= 2 &&
    guide.sections.every(section =>
      section?.title?.ar?.trim() && section?.title?.en?.trim() &&
      section?.body?.ar?.trim() && section?.body?.en?.trim()
    ) &&
    Array.isArray(guide.faq) && guide.faq.length > 0
  );
}

export function alAinCleaningModel({locale='ar',service,providers=[]}) {
  if (!['ar','en'].includes(locale)) return null;
  const guide = service ? CLEANING_SERVICES.find(item=>item.slug===service) : CLEANING_HUB;
  if (!guide) return null;
  const category = 'cleaning-services';
  const paths = alternates({category,service});
  const selected = eligibleProviders(providers,{category,service});
  const reviewedEditorial = hasReviewedCleaningGuide(guide);
  // Editorial guides remain indexable on their own merit; related company cards
  // never imply that a provider has published this exact service.
  const relatedProviders = service && !selected.length ? eligibleProviders(providers,{category}) : [];
  const en = locale==='en';
  const heading = guide.title[locale] + (service ? (en?' in Al Ain':' في العين'):'');
  return {
    cleaningGuide:true, locale, category, service:service||null,
    title:heading+' | '+(en?'Biet Alreef':'بيت الريف'), heading,
    description:guide.intro[locale], canonical:paths[locale], alternates:paths,
    // Completed bilingual editorial remains indexable without a provider;
    // provider cards still require actual publication and coverage.
    indexable:reviewedEditorial, guide, providers:selected, relatedProviders, areas:AREAS,
    reviewedAt:CLEANING_REVIEWED_AT,
    breadcrumbs:[{name:en?'Al Ain':'العين',href:localPath({locale})},{name:en?'Cleaning':'التنظيف',href:localPath({locale,category})},...(service?[{name:guide.title[locale],href:localPath({locale,category,service})}]:[])],
    schema:{'@context':'https://schema.org','@type':service?'WebPage':'CollectionPage','@id':paths[locale]+'#page',url:paths[locale],name:heading,description:guide.intro[locale],inLanguage:en?'en-AE':'ar-AE',about:{'@type':'Thing',name:heading},mainEntity:{'@type':'ItemList',itemListElement:(service?selected:CLEANING_SERVICES).map((item,i)=>({'@type':'ListItem',position:i+1,name:service?item.name[locale]:item.title[locale],url:service?'https://bietalreef.ae'+(en?'/en':'')+'/providers/'+item.slug:'https://bietalreef.ae'+localPath({locale,category,service:item.slug})}))}}
  };
}

// Stable URL ownership is independent of whether the editorial is ready to index.
// The legacy provider-backed registry may not reclaim these paths when a guide
// is temporarily unreviewed: that would put noindex pages in the sitemap.
export function cleaningGuidePaths() {
  return [null, ...CLEANING_SERVICES.map(item => item.slug)].flatMap(service =>
    ['ar', 'en'].map(locale => 'https://bietalreef.ae' + localPath({ locale, category: 'cleaning-services', service }))
  );
}

export function cleaningGuideSitemap() {
  return [null, ...CLEANING_SERVICES.map(item => item.slug)].flatMap(service =>
    ['ar', 'en'].flatMap(locale => {
      const model = alAinCleaningModel({ locale, service, providers: [] });
      return model?.indexable ? [{
        loc: model.canonical,
        lastmod: model.reviewedAt,
        changefreq: 'monthly',
        priority: service ? 0.68 : 0.72,
        alternates: model.alternates,
      }] : [];
    })
  );
}
