import guides from '../data/dubaiDecisionGuides.json';

// Selected customer-facing decision and FAQ sections from the existing Dubai
// editorial. Taxonomy names and counts continue to come from the database.
export default function DubaiDecisionGuide({sector}) {
 const items=guides[sector]||[];
 if(!items.length)return null;
 return <section className="mx-auto max-w-6xl px-4 py-8"><h2 className="text-xl font-extrabold text-[#193b53] md:text-3xl">دليل عملي لاختيار الخدمة في دبي</h2><details className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer text-lg font-bold text-[#185b87]">اقرأ دليل الاختيار والأسئلة الشائعة</summary><div className="mt-5 space-y-5 leading-8 text-slate-700">{items.map((item,index)=><section key={index}>{item.level===2?<h3 className="text-xl font-bold text-[#193b53]">{item.heading}</h3>:<h4 className="font-bold text-[#193b53]">{item.heading}</h4>}{item.paragraphs.map((p,i)=><p className="mt-2" key={i}>{p}</p>)}</section>)}</div></details></section>;
}
