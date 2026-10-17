import "../styles/globals.css";
import "../styles/app-experience.css";
import { isAppExperience } from "../lib/appExperience";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import ClientSafetyBoundary from "../components/ClientSafetyBoundary";
import PrivacyConsentCenter from "../components/PrivacyConsentCenter";
import ConsentAwareSpeedInsights from "../components/ConsentAwareSpeedInsights";
import ConsentAwareGoogleTag from "../components/ConsentAwareGoogleTag";
import PwaLifecycleManager from "../components/PwaLifecycleManager";
import PwaInstallPrompt from "../components/PwaInstallPrompt";
import BusinessLandingMeta, { resolveBusinessLandingPath } from "../components/BusinessLandingMeta";
import { initPublicAnalytics } from "../lib/publicAnalytics";
import { useEffect, useState } from "react";

const ProviderProductInteraction = dynamic(
  () => import("../components/provider/ProviderProductInteraction"),
  { ssr: false }
);
const ArklineProfileEnhancements = dynamic(
  () => import("../components/provider/ArklineProfileEnhancements"),
  { ssr: false }
);
const ArklineProjectsAndChannels = dynamic(
  () => import("../components/provider/ArklineProjectsAndChannels"),
  { ssr: false }
);
const WeyakChat = dynamic(() => import('../components/WeyakChat'), { ssr: false });
const FloatingWhatsAppSupport = dynamic(() => import('../components/FloatingWhatsAppSupport'), { ssr: false });

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);
  useEffect(() => {
    const start = () => setNavigating(true);
    const finish = () => setNavigating(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", finish);
    router.events.on("routeChangeError", finish);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", finish);
      router.events.off("routeChangeError", finish);
    };
  }, [router.events]);
  const currentPath = router.asPath?.split('?')[0] || '/';
  const metadataPath = resolveBusinessLandingPath({
    currentPath,
    pathname: router.pathname,
    pageProps,
  });
  const isPreviewSurface = currentPath === '/preview/al-ain-responsive';
  const isEnglishPage = currentPath === '/en' || currentPath.startsWith('/en/');
  const isProviderProfile = /^\/(?:en\/)?providers\/(?!register(?:\/|$))[^/?#]+/.test(currentPath);
  const usesUnifiedProviderTemplate = /^\/(?:en\/)?providers\/(?:arkleen|arkline|alrehab-home-clean)(?:\/|$)/.test(currentPath);

  useEffect(() => isPreviewSurface ? undefined : initPublicAnalytics(router), [router, isPreviewSurface]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.toggle('locale-en', isEnglishPage);
    body.classList.toggle('locale-en', isEnglishPage);

    if (isEnglishPage) {
      html.lang = 'en';
      html.dir = 'ltr';
      body.dir = 'ltr';
    } else {
      html.lang = 'ar';
      html.dir = 'rtl';
      body.dir = 'rtl';
    }

    return () => {
      html.classList.remove('locale-en');
      body.classList.remove('locale-en');
    };
  }, [isEnglishPage]);

  useEffect(() => {
    const openWeyaakLinksInWidget = (event) => {
      const link = event.target?.closest?.('a[href]');
      if (!link) return;
      let pathname = '';
      try { pathname = new URL(link.href, window.location.origin).pathname; } catch { return; }
      if (!['/weyaak', '/en/weyaak'].includes(pathname)) return;
      event.preventDefault();
      const parts = window.location.pathname.split('/').filter(Boolean);
      const uaeIndex = parts.indexOf('uae');
      window.dispatchEvent(new CustomEvent('weyaak:open', { detail: {
        path: window.location.pathname,
        sourceTitle: link.dataset.weyaakTitle || document.title,
        section: link.dataset.weyaakSection || (uaeIndex >= 0 ? (isEnglishPage ? 'UAE Directory' : 'دليل الإمارات') : ''),
        emirate: uaeIndex >= 0 ? parts[uaeIndex + 1] || '' : '',
        area: uaeIndex >= 0 ? parts[uaeIndex + 2] || '' : '',
        service: uaeIndex >= 0 ? parts[uaeIndex + 3] || '' : '',
        provider: parts.includes('providers') ? parts[parts.indexOf('providers') + 1] || '' : '',
        product: parts.includes('marketplace') ? parts[parts.indexOf('marketplace') + 1] || '' : '',
      } }));
    };
    document.addEventListener('click', openWeyaakLinksInWidget);
    return () => document.removeEventListener('click', openWeyaakLinksInWidget);
  }, [isEnglishPage]);

  return (
    <ClientSafetyBoundary>
      <div className={isAppExperience(currentPath) ? "br-app" : undefined}>{navigating && isAppExperience(currentPath) && <div className="br-route-progress" role="progressbar" aria-label={isEnglishPage ? "Opening page" : "فتح الصفحة"} />}<Component {...pageProps} /></div>
      {!isPreviewSurface && <>
      <BusinessLandingMeta path={metadataPath} />
      {currentPath === '/weyaak' || currentPath === '/en/weyaak' ? (
        <WeyakChat locale={isEnglishPage ? 'en' : 'ar'} standalone />
      ) : (
        <FloatingWhatsAppSupport locale={isEnglishPage ? 'en' : 'ar'} />
      )}
      {isProviderProfile ? (
        <>
          <Head>
            <link rel="stylesheet" href="/styles/provider-profile.css" />
          </Head>
          <ProviderProductInteraction currentPath={router.asPath || ''} />
        </>
      ) : null}
      {usesUnifiedProviderTemplate ? (
        <>
          <ArklineProfileEnhancements currentPath={router.asPath || ''} />
          <ArklineProjectsAndChannels currentPath={router.asPath || ''} />
        </>
      ) : null}
      <PrivacyConsentCenter locale={isEnglishPage ? "en" : "ar"} />
      <ConsentAwareGoogleTag />
      <ConsentAwareSpeedInsights />
      <PwaInstallPrompt locale={isEnglishPage ? "en" : "ar"} />
      <PwaLifecycleManager locale={isEnglishPage ? "en" : "ar"} />
      </>}
    </ClientSafetyBoundary>
  );
}