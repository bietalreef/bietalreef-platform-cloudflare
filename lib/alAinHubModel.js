import {AL_AIN_SECTORS,findAlAinSector} from '../data/alAinHub.js';
import {AREAS} from '../data/localServices.js';
import {localPath} from './localServices.js';
export function alAinHubModel({locale='ar',category=null,providers=[]}={}){
 if(!['ar','en'].includes(locale))return null;
 const sector=category?findAlAinSector(category):null;if(category&&!sector)return null;
 const available=providers.filter(p=>p.published===true&&(p.verified===true||p.editorialListing===true)&&p.visibility?.directory===true&&(!p.visibility.requiresSubscription||p.subscription?.active===true)&&p.coverage?.some(c=>c.approved&&c.emirate==='abu-dhabi'&&c.city==='al-ain'));
 const selected=sector?available.filter(p=>p.services?.some(s=>s.published&&(sector.taxonomy.includes(s.category)||sector.slug==='hourly-cleaning'&&sector.taxonomy.some(t=>t===s.slug||t===s.sourceSlug))) || sector.slug!=='hourly-cleaning'&&p.categories?.some(c=>sector.taxonomy.includes(c))):available;
 const heading=sector?`${sector.name[locale]} ${locale==='en'?'in Al Ain':'في العين'}`:locale==='en'?'Companies, shops & suppliers in Al Ain':'شركات ومحلات وموردون في العين';
 const description=sector?sector.intro[locale]:locale==='en'?'Explore Al Ain services, companies, shops and suppliers. Choose your sector and district, compare scope and prepare a clear quotation request.':'اكتشف خدمات العين والشركات والمحلات والموردين. اختر التخصص والمنطقة، وقارن نطاق العمل وجهّز طلب عرض سعر واضحًا.';
 const path=localPath({locale,category:category||undefined});
 return {cityHub:true,locale,category,sector,providers:selected,areas:AREAS,sectors:AL_AIN_SECTORS,indexable:false,title:heading+' | '+(locale==='en'?'Biet Alreef':'بيت الريف'),heading,description,canonicalPath:path,schema:{'@context':'https://schema.org','@type':'CollectionPage',name:heading,url:'https://bietalreef.ae'+path,description,mainEntity:{'@type':'ItemList',itemListElement:(sector?selected.map(p=>({name:p.name[locale],url:`https://bietalreef.ae${locale==='en'?'/en':''}/providers/${p.slug}`})):AL_AIN_SECTORS.map(s=>({name:s.name[locale],url:'https://bietalreef.ae'+localPath({locale,category:s.slug})}))).map((s,i)=>({'@type':'ListItem',position:i+1,...s}))}}};
}
