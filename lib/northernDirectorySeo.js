import {directorySectorSeo} from '../data/abuDhabiSectorSeo';

import {isNorthernEmirate,NORTHERN_SECTOR_NOTES,northernAreaSectorNote,northernEmirateIntro} from '../data/northernDirectoryContent';

export function northernDirectorySeo(slug,locale,emirate,area=null){
 if(!isNorthernEmirate(emirate?.slug)||!NORTHERN_SECTOR_NOTES[slug])return null;
 const en=locale==='en',place=area||emirate,base=directorySectorSeo(slug,locale,place);
 if(!base)return null;
 const name=en?place.nameEn:place.nameAr,region=en?emirate.nameEn:emirate.nameAr;
 const note=area?northernAreaSectorNote(emirate,area,slug,locale):northernEmirateIntro(emirate,locale);
 const heading=area?`${base.heading} — ${en?'in':'في'} ${region}`:base.heading;
 const explanation=en?`For ${name}${area?', '+region:''}, describe the property, required work, access and measurements before requesting a quotation.`:`لخدمة ${name}${area?'، '+region:''}، حدد العقار ونطاق العمل والمقاسات وشروط الدخول قبل طلب السعر.`;
 return {heading,title:`${heading} | ${en?'Biet Al Reef':'بيت الريف'}`,description:`${base.description} ${explanation} ${note}`.slice(0,540),localNote:note};
}
