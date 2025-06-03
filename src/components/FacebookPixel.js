'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  // Add debugging
  useEffect(() => {
    console.log('Facebook Pixel ID from env:', pixelId);
    console.log('All env variables:', process.env);
  }, []);

  useEffect(() => {
    if (!window.fbq) return;

    // Track page view
    window.fbq('track', 'PageView');
  }, [pathname, searchParams]);

  if (!pixelId) {
    console.warn('Facebook Pixel ID is not configured');
    return null;
  }

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
} 