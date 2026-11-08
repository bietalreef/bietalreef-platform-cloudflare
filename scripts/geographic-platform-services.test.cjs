const test = require('node:test');
const assert = require('node:assert/strict');
const {buildGeographicServiceCards, servicePath} = require('../lib/geographicServiceModel.cjs');

function fixture() {
 return {
  categories:[{id:'cat',slug:'cleaning-services'},{id:'other-cat',slug:'general-maintenance'}],
  categoryMap:[{category_id:'cat',activity_id:'cleaning'},{category_id:'other-cat',activity_id:'maintenance'}],
  activities:[{id:'cleaning'},{id:'maintenance'}],
  specialties:[{id:'clean',activity_id:'cleaning',audience_type:'company',slug:'clean',name_ar:'تنظيف',name_en:'Cleaning'},{id:'craft',activity_id:'cleaning',audience_type:'craft',slug:'craft'}],
  services:[{id:'sofa',specialty_id:'clean',slug:'sofa',name_ar:'تنظيف الكنب',name_en:'Sofa cleaning'}, {id:'rug',specialty_id:'clean',slug:'rug',name_ar:'تنظيف السجاد',name_en:'Carpet cleaning'}, {id:'craft-sofa',specialty_id:'craft',slug:'craft-sofa'}],
  profiles:[{id:'p1',slug:'rehab',name_ar:'الرحاب',name_en:'Rehab',verification_status:'verified',publication_status:'published',landing_page_status:'published'}, {id:'p2',slug:'draft',name_ar:'شركة',name_en:'Company',verification_status:'verified',publication_status:'draft',landing_page_status:'published'}],
  accounts:[{id:'a1',provider_public_profile_id:'p1',status:'active'},{id:'a2',provider_public_profile_id:'p2',status:'active'}],
  cards:[{id:'c1',platform_provider_account_id:'a1',card_type:'service',status:'published',title_ar:'تنظيف الكنب',title_en:'Sofa cleaning',content:{channel:'platform',slug:'sofa-cleaning',taxonomy_service_id:'sofa',taxonomy_service_ids:['rug']}},
   {id:'c2',platform_provider_account_id:'a2',card_type:'service',status:'published',title_ar:'خدمة',title_en:'Service',content:{channel:'platform',slug:'draft-service',taxonomy_service_id:'sofa'}},
   {id:'c3',platform_provider_account_id:'a1',card_type:'service',status:'published',title_ar:'خدمة تطبيق',title_en:'App service',content:{channel:'app',slug:'app-service',taxonomy_service_id:'sofa'}},
   {id:'c4',platform_provider_account_id:'a1',card_type:'service',status:'published',title_ar:'خدمة قديمة',title_en:'Expired service',expires_at:'2020-01-01T00:00:00Z',content:{channel:'platform',slug:'expired-service',taxonomy_service_id:'sofa'}},
   {id:'c5',platform_provider_account_id:'a1',card_type:'service',status:'published',title_ar:'حرفي',title_en:'Craft',content:{channel:'platform',slug:'craft-service',taxonomy_service_id:'craft-sofa'}}],
  locations:[{provider_id:'p1',emirate_id:'ad',coverage_type:'emirate',is_active:true}],
  emirates:[{id:'ad',slug:'abu-dhabi'}],cities:[{id:'ain',slug:'al-ain',emirate_id:'ad'},{id:'city',slug:'abu-dhabi-city',emirate_id:'ad'}],
  areas:[{id:'hili',slug:'al-hili',city_id:'ain',name_ar:'الهيلي',name_en:'Al Hili'},{id:'jimi',slug:'al-jimi',city_id:'ain',name_ar:'الجيمي',name_en:'Al Jimi'},{id:'khalifa',slug:'khalifa-city',city_id:'city',name_ar:'مدينة خليفة',name_en:'Khalifa City'}]
 };
}
test('only platform-published verified company services appear in their taxonomy sector',()=>{
 const d=fixture(), cards=buildGeographicServiceCards(d,{sector:'cleaning-services'});
 assert.deepEqual(cards.map(v=>v.id),['c1']);
 assert.deepEqual(cards[0].taxonomyServices.map(v=>v.slug).sort(),['rug','sofa']);
 assert.equal(cards[0].href,'/uae/abu-dhabi/cleaning-services/sofa-cleaning/rehab');
 assert.equal(buildGeographicServiceCards(d,{sector:'general-maintenance'}).length,0);
});
test('service then company route retains Arabic or English location context',()=>{
 const d=fixture(), cards=buildGeographicServiceCards(d,{locale:'en',city:'al-ain',area:'al-hili',sector:'cleaning-services'});
 assert.equal(cards[0].href,'/en/uae/abu-dhabi/al-ain/al-hili/cleaning-services/sofa-cleaning/rehab');
 assert.equal(cards[0].placeName,'Al Hili');
 assert.equal(servicePath({sector:'cleaning-services',service:'../x',provider:'rehab'}),null);
});
test('specific area coverage cannot be promoted to a different area',()=>{
 const d=fixture();d.locations=[{provider_id:'p1',emirate_id:'ad',city_id:'ain',area_id:'hili',coverage_type:'area',is_active:true}];
 assert.equal(buildGeographicServiceCards(d,{city:'al-ain',area:'al-hili',sector:'cleaning-services'}).length,1);
 assert.equal(buildGeographicServiceCards(d,{city:'al-ain',area:'al-jimi',sector:'cleaning-services'}).length,0);
 assert.equal(buildGeographicServiceCards(d,{area:'khalifa-city',sector:'cleaning-services'}).length,0);
 assert.equal(buildGeographicServiceCards(d,{city:'al-ain',sector:'cleaning-services'}).length,1);
});
test('city and emirate coverage flow to their real neighborhoods only',()=>{
 const d=fixture();d.locations=[{provider_id:'p1',emirate_id:'ad',city_id:'ain',coverage_type:'city',is_active:true}];
 assert.equal(buildGeographicServiceCards(d,{city:'al-ain',area:'al-hili',sector:'cleaning-services'}).length,1);
 assert.equal(buildGeographicServiceCards(d,{area:'khalifa-city',sector:'cleaning-services'}).length,0);
 assert.equal(buildGeographicServiceCards(d,{area:'not-a-place',sector:'cleaning-services'}).length,0);
});
test('only active platform offers are shown, with a link to their real service',()=>{
 const d=fixture();
 d.cards.push({id:'offer',platform_provider_account_id:'a1',card_type:'offer',status:'published',title_ar:'عرض تنظيف الكنب',title_en:'Sofa cleaning offer',content:{channel:'platform',slug:'sofa-offer',service_slug:'sofa-cleaning',taxonomy_service_id:'sofa',discount_percent:10}});
 const offers=buildGeographicServiceCards(d,{sector:'cleaning-services',cardType:'offer'});
 assert.equal(offers.length,1);
 assert.equal(offers[0].href,'/providers/rehab/offers/sofa-offer');
 assert.equal(offers[0].linkedServiceHref,'/uae/abu-dhabi/cleaning-services/sofa-cleaning/rehab');
 assert.equal(offers[0].discountPercent,10);
 d.cards.at(-1).expires_at='2020-01-01';
 assert.equal(buildGeographicServiceCards(d,{sector:'cleaning-services',cardType:'offer'}).length,0);
});
test('coverage never moves across emirates even when city names or area slugs collide',()=>{
 const d=fixture();d.emirates.push({id:'dx',slug:'dubai'});d.cities.push({id:'dx-city',slug:'dubai-city',emirate_id:'dx'});d.areas.push({id:'dx-hili',slug:'al-hili',city_id:'dx-city',name_ar:'اختبار دبي',name_en:'Dubai test'});
 d.locations=[{provider_id:'p1',emirate_id:'ad',coverage_type:'emirate',is_active:true}];
 assert.equal(buildGeographicServiceCards(d,{emirate:'dubai',area:'al-hili',sector:'cleaning-services'}).length,0);
 d.locations.push({provider_id:'p1',emirate_id:'dx',area_id:'dx-hili',coverage_type:'area',is_active:true});
 const result=buildGeographicServiceCards(d,{emirate:'dubai',area:'al-hili',sector:'cleaning-services'});
 assert.equal(result.length,1);assert.equal(result[0].placeName,'اختبار دبي');
 assert.equal(servicePath({emirate:'dubai',city:'al-ain',sector:'cleaning-services',service:'sofa',provider:'rehab'}),null);
});
