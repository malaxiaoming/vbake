// Send a Facebook Pixel event. Page components can mount before the pixel has loaded
// (e.g. when a customer opens /order directly), so hold events until FacebookPixel flushes them.
export function trackPixelEvent(event, params) {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    window.fbq("track", event, params);
  } else {
    (window.__pendingPixelEvents ||= []).push([event, params]);
  }
}

export function flushPendingPixelEvents() {
  const pending = window.__pendingPixelEvents || [];
  window.__pendingPixelEvents = [];
  pending.forEach(([event, params]) => window.fbq("track", event, params));
}
