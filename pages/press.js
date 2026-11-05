import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const url = 'https://bietalreef.ae/press';

export default function Press() {
  return (
    <>
      <Head>
        <title>أخبار وإعلانات بيت الريف | بيت الريف</title>
        <meta name="description" content="آخر الأخبار والإعلانات الرسمية لمنصة بيت الريف في مجال المقاولات والخدمات والتحول الرقمي في دولة الإمارات." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="ar-AE" href={url} />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/press" />
        <link rel="alternate" hrefLang="x-default" href={url} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-slate-900">
        <Navbar />
        <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12 sm:px-6 md:py-20">
          <p className="text-sm font-bold text-amber-700">آخر مستجدات بيت الريف</p>
          <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">الأخبار والإعلانات</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">تعرف على الإعلانات الرسمية وتحديثات منظومة بيت الريف لخدمات البناء والمقاولات والأعمال الرقمية في دولة الإمارات.</p>
          <article className="mt-9 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm text-slate-500">1 سبتمبر 2026</p>
            <h2 className="mt-2 text-xl font-bold md:text-2xl">
              <Link href="/press/smart-platform-launch" className="hover:underline">إطلاق منظومة بيت الريف الذكية لقطاع البناء في الإمارات</Link>
            </h2>
            <p className="mt-3 leading-8 text-slate-700">تعرّف على ربط العملاء ومقدمي الخدمات والسوق الرقمي والمستندات والذكاء الاصطناعي «وياك» في منظومة واحدة.</p>
            <Link href="/press/smart-platform-launch" className="mt-5 inline-block font-bold text-blue-700 underline underline-offset-4">اقرأ الإعلان</Link>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
