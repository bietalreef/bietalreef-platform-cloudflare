import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';

const url = 'https://bietalreef.ae/en/press';

export default function EnglishPress() {
  return (
    <>
      <Head>
        <title>News & Announcements | Biet Al Reef</title>
        <meta name="description" content="Official Biet Al Reef news and announcements about the UAE construction and business platform." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en-AE" href={url} />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/press" />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/press" />
      </Head>
      <EnglishLayout>
        <main dir="ltr" className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12 text-left sm:px-6 md:py-20">
          <p className="text-sm font-bold text-amber-700">Biet Al Reef updates</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-5xl">News & Announcements</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">Read official platform announcements and updates about Biet Al Reef's construction, business and digital-services ecosystem in the UAE.</p>
          <article className="mt-9 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm text-slate-500">1 September 2026</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900 md:text-2xl">
              <Link href="/en/press/smart-platform-launch" className="hover:underline">Biet Al Reef launches a smart construction operating ecosystem in the UAE</Link>
            </h2>
            <p className="mt-3 leading-8 text-slate-700">Learn how the platform connects customers, service providers, marketplace discovery, documents and Weyaak AI.</p>
            <Link href="/en/press/smart-platform-launch" className="mt-5 inline-block font-bold text-blue-700 underline underline-offset-4">Read the announcement</Link>
          </article>
        </main>
      </EnglishLayout>
    </>
  );
}
