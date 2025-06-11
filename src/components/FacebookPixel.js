"use client";

import { useEffect } from 'react';
import Image from 'next/image';

export default function FacebookPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const expectedId = '999278518697592';

  useEffect(() => {
    console.log('Environment variables:', {
      NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
      FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
      NODE_ENV: process.env.NODE_ENV,
      Expected: expectedId,
      Current: pixelId
    });

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
    console.log('Initializing Facebook Pixel with ID:', expectedId);
    fbq('init', expectedId);
    fbq('track', 'PageView');
  }, [pixelId]); // Add pixelId to dependency array

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