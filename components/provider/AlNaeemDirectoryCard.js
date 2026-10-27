import Link from 'next/link';
export default function AlNaeemDirectoryCard({ data, locale='ar' }) {
 if (!data?.profile) return null;
 const prefix=locale==='en'?'/en':'';
 const name=data.profile['name_'+locale]||data.profile.name_ar;
 return <Link href={`${prefix}/providers/al-naeem-cleaning-services`} className='block rounded-2xl border bg-white p-4'><h3 className='font-bold'>{name}</h3><p>{locale==='en'?'View company':'عرض الشركة'}</p></Link>;
}
