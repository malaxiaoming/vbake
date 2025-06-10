This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Facebook Pixel Implementation

The application implements Facebook Pixel tracking for analytics and retargeting purposes. The Pixel is initialized in the root layout (`src/app/layout.js`) and is available throughout the application.

### Pages with Pixel Tracking

1. **Father's Day Promotion Page** (`src/app/promotions/fathers-day/page.js`)
   - **Page View Event**
     - Event: `ViewContent`
     - Parameters:
       - `content_name`: "Father's Day Promotion"
       - `content_category`: "Promotion"
       - `content_type`: "Bundle"
       - `content_ids`: ["fathers-day-2025"]
       - `value`: 158
       - `currency`: "MYR"

   - **Bundle Selection Event**
     - Event: `ViewContent`
     - Parameters:
       - `content_name`: [Selected Bundle Name]
       - `content_category`: "Father's Day Bundle"
       - `content_type`: "Bundle"
       - `content_ids`: [`fathers-day-${bundle-name}`]

   - **Order Initiation Event**
     - Event: `InitiateCheckout`
     - Parameters:
       - `content_name`: [Selected Bundle Name]
       - `content_category`: "Father's Day Bundle"
       - `content_type`: "Bundle"
       - `content_ids`: [`fathers-day-${bundle-name}`]
       - `value`: [Bundle Price]
       - `currency`: "MYR"

2. **Cakes Catalog Page** (`src/app/cakes/page.js`)
   - **Page View Event**
     - Event: `ViewContent`
     - Parameters:
       - `content_name`: "Cakes Catalog"
       - `content_category`: "Cakes"
       - `content_type`: "Catalog"
       - `content_ids`: ["cakes-catalog-2025"]
       - `value`: 0
       - `currency`: "MYR"

   - **Cake Selection Event**
     - Event: `ViewContent`
     - Parameters:
       - `content_name`: [Selected Cake Name]
       - `content_category`: "Cake"
       - `content_type`: "Product"
       - `content_ids`: [`cake-${cake-id}`]
       - `value`: [Cake Price]
       - `currency`: "MYR"

3. **Order Page** (`src/app/order/page.js`)
   - **Page View Event**
     - Event: `ViewContent`
     - Parameters:
       - `content_name`: "Order Page"
       - `content_category`: "Order"
       - `content_type`: "Page"
       - `content_ids`: ["order-page-2025"]
       - `value`: 0
       - `currency`: "MYR"

   - **Product Selection Event**
     - Event: `ViewContent`
     - Parameters:
       - `content_name`: [Selected Product Name]
       - `content_category`: [Product Type]
       - `content_type`: "Product"
       - `content_ids`: [`${productType}-${product-name}`]
       - `value`: [Total Price]
       - `currency`: "MYR"

   - **Checkout Initiation Event**
     - Event: `InitiateCheckout`
     - Parameters:
       - `content_name`: [Selected Product Name]
       - `content_category`: [Product Type]
       - `content_type`: "Product"
       - `content_ids`: [`${productType}-${product-name}`]
       - `value`: [Total Price]
       - `currency`: "MYR"

### Using Pixel Data in Meta Ads

Advertisers can utilize these tracking events in Meta Ads Manager in several ways:

1. **Custom Audiences**
   - Create audiences based on:
     - People who viewed the Father's Day promotion
     - People who viewed specific bundles
     - People who initiated checkout but didn't complete the order

2. **Conversion Tracking**
   - Set up conversion tracking for:
     - Page views
     - Bundle views
     - Checkout initiations

3. **Dynamic Ads**
   - Create dynamic ads that show the specific bundle a user viewed
   - Retarget users with the bundle they showed interest in

4. **Campaign Optimization**
   - Optimize ad delivery for specific actions (e.g., checkout initiations)
   - Use the value parameter to optimize for purchase value

5. **Analytics**
   - Track the customer journey from promotion view to checkout
   - Analyze which bundles generate the most interest
   - Measure the effectiveness of retargeting campaigns

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
