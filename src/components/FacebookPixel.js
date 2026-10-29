"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { flushPendingPixelEvents } from '@/lib/pixel';
import Image from 'next/image';

export default function FacebookPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const expectedId = '999278518697592';
  const pathname = usePathname();
  const isFirstPage = useRef(true);

  useEffect(() => {
    if (!pixelId) {
      console.warn('Facebook Pixel ID is not configured');
      return;
    }

    if (pixelId !== expectedId) {
      console.warn('Facebook Pixel ID mismatch:', {
        Expected: expectedId,
        Current: pixelId
      });
    }

    // Load Facebook Pixel script
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // Initialize pixel with the expected ID
    fbq('init', expectedId);
    fbq('track', 'PageView');
    flushPendingPixelEvents();
  }, [pixelId]); // Add pixelId to dependency array

  // The layout stays mounted between pages, so count a PageView for each later page change
  // (the first page view is sent above when the pixel loads)
  useEffect(() => {
    if (isFirstPage.current) {
      isFirstPage.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  if (!pixelId) return null;

  return (
    <noscript>
      <Image
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${expectedId}&ev=PageView&noscript=1`}
        alt="Facebook Pixel"
      />
    </noscript>
  );
} 