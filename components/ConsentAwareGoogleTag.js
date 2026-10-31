import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { analyticsConsent, CONSENT_EVENT } from './PrivacyConsentCenter';

export const GOOGLE_ADS_TAG_ID = 'AW-17691718176';
export const GOOGLE_ANALYTICS_ID = 'G-YXKFW0GEMF';
export const GOOGLE_TAG_ID = 'GT-TXH7M28M';

function consentState() {
  return analyticsConsent() === 'accepted' ? 'granted' : 'denied';
}

export default function ConsentAwareGoogleTag() {
  const router = useRouter();
  const [productionHost, setProductionHost] = useState(false);
  useEffect(() => setProductionHost(['bietalreef.ae', 'www.bietalreef.ae'].includes(window.location.hostname)), []);

  useEffect(() => {
    const syncConsent = () => {
      const state = consentState();
      window.gtag?.('consent', 'update', {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
      });
    };

    // Initial consent may already be stored when this component mounts, while
    // the Next.js Google tag scripts have not initialized window.gtag yet.
    // Replay the saved preference after the tag's ready event, without
    // changing a visitor's choice or granting consent implicitly.
    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    window.addEventListener('bietalreef:google-ready', syncConsent);
    return () => {
      window.removeEventListener(CONSENT_EVENT, syncConsent);
      window.removeEventListener('bietalreef:google-ready', syncConsent);
    };
  }, []);

  useEffect(() => {
    const trackPage = (url) => {
      window.gtag?.('config', GOOGLE_ANALYTICS_ID, {
        page_path: url,
        page_location: window.location.href,
      });
      window.gtag?.('config', GOOGLE_ADS_TAG_ID, {
        page_path: url,
        page_location: window.location.href,
      });
    };

    router.events.on('routeChangeComplete', trackPage);
    return () => router.events.off('routeChangeComplete', trackPage);
  }, [router.events]);

  if (!productionHost) return null;

  return (
    <>
      <Script id="bietalreef-google-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        id="bietalreef-google-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="bietalreef-google-tag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          // Apply an existing affirmative choice before the first page-view hit.
          // Default remains denied unless the visitor previously opted in.
          try {
            var stored = window.localStorage.getItem('bietalreef.privacy.v1');
            var storedChoice = stored;
            if (stored && stored.charAt(0) === '{') {
              var parsed = JSON.parse(stored);
              storedChoice = parsed && parsed.analytics;
            }
            if (storedChoice === 'accepted') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_TAG_ID}');
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
          window.dispatchEvent(new Event('bietalreef:google-ready'));
        `}
      </Script>
    </>
  );
}
