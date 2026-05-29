// PWA update handling: checks for a new version on focus + periodically, shows a banner,
// and lets the home ↻ button apply the update. Browser-only (dynamic import avoids SSR issues).

export const pwa = $state<{ needRefresh: boolean }>({ needRefresh: false });

let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;
let reg: ServiceWorkerRegistration | undefined;
let started = false;

export async function initPWA() {
  if (started || typeof window === 'undefined') return;
  started = true;
  try {
    const { registerSW } = await import('virtual:pwa-register');
    updateSW = registerSW({
      immediate: true,
      onRegisteredSW(_swUrl: string, r?: ServiceWorkerRegistration) {
        reg = r;
        if (r) {
          // poll while open…
          setInterval(() => r.update().catch(() => {}), 30 * 60 * 1000);
          // …and re-check whenever the app comes back to the foreground (key on iOS).
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') r.update().catch(() => {});
          });
        }
      },
      onNeedRefresh() {
        pwa.needRefresh = true;
      }
    });
  } catch {
    /* SW not available — ignore */
  }
}

/** Apply the waiting update and reload. */
export async function applyUpdate() {
  pwa.needRefresh = false;
  if (updateSW) await updateSW(true);
  else location.reload();
}

/** Ask the browser to check for a new version now. If one is found, the banner appears. */
export async function checkForUpdate() {
  await reg?.update().catch(() => {});
}
