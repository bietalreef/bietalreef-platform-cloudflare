import DiscoveryEntityCard from './cards/DiscoveryEntityCard';

export default function GeographicOfferCards({items,locale='ar',place=''}) {
 if (!items?.length) return null;
 const en=locale==='en';
 return <section className="mx-auto max-w-6xl px-4 py-8" aria-labelledby="published-offers-title">
  <h2 id="published-offers-title" className="mb-4 text-xl font-extrabold text-[#193b53] md:text-3xl">{en?`Published offers in ${place}`:`العروض المنشورة في ${place}`}</h2>
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{items.map(item=><DiscoveryEntityCard key={item.id} item={item} locale={locale} type="offer"/>)}</div>
 </section>;
}
