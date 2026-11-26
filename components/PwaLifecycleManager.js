import { useEffect } from 'react';

// Public navigation must never depend on a service-worker update.
// The worker activates itself; the next normal navigation picks up the release.
export default function PwaLifecycleManager() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return undefined;
    let cancelled = false;
    let timer;
    const register = async () => {
      if (cancelled) return;
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/', updateViaCache: 'none',
        });
        if (cancelled) return;
        if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        timer = window.setInterval(() => {
          registration.update().catch(() => undefined);
        }, 60 * 60 * 1000);
      } catch (error) {
        console.warn('Biet Al Reef PWA registration was skipped.', error);
      }
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', register);
      if (timer) window.clearInterval(timer);
    };
  }, []);
  return null;
}
