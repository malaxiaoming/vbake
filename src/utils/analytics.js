// Facebook Pixel event tracking
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Common events
export const trackPurchase = (value, currency = 'MYR') => {
  trackEvent('Purchase', { value, currency });
};

export const trackAddToCart = (value, currency = 'MYR') => {
  trackEvent('AddToCart', { value, currency });
};

export const trackInitiateCheckout = (value, currency = 'MYR') => {
  trackEvent('InitiateCheckout', { value, currency });
};

export const trackViewContent = (value, currency = 'MYR') => {
  trackEvent('ViewContent', { value, currency });
};

export const trackLead = () => {
  trackEvent('Lead');
};

export const trackCompleteRegistration = () => {
  trackEvent('CompleteRegistration');
}; 