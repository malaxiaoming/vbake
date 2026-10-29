# VBake.KL website

Marketing and ordering site for [VBake.KL](https://www.vbakekl.com), a home bakery in Sri Petaling, Kuala Lumpur.
Customers browse cakes, build an order (cake, flavour, size, delivery date) and send it to the bakery as a
pre-filled WhatsApp message. There is no backend or database; Vercel deploys `master` automatically.

Built with Next.js (App Router), React and Tailwind CSS.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Before opening a pull request, check the production build:

```bash
npm run lint
npm run build
```

## Where things live

| What | Where |
| --- | --- |
| Cakes, sizes and prices | `src/data/cakes.js` (`fixedFlavor` locks a cake to one flavour) |
| Flavours and top-up prices | `src/data/flavors.js` |
| Add-ons (section currently switched off) | `src/data/addons.js`, `disableAddsOn` in `src/app/order/order-form.js` |
| Homepage banners | `src/data/events.js` and `public/images/promotions/` |
| Phone, email, hours, SSM number | `src/data/contact.js` |
| Site address for sitemap and share previews | `src/lib/site.js` |
| Brand colours and fonts | `src/app/globals.css` (`@theme`), `src/app/layout.js` |

## Pages

- `/`: homepage
- `/cakes` and `/cakes/[id]`: catalogue and one page per cake
- `/order`: order form; `?cakeId=<id>` preselects a cake. Place Order opens WhatsApp with the order details.
- `/contact`: contact details and a WhatsApp message form

Old `/promotions`, `/gifts`, `/flowers` and `/catering` links redirect to `/cakes` (see `next.config.mjs`).

## Facebook Pixel

The Pixel loads from `src/components/FacebookPixel.js` when `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is set in Vercel.
The cakes catalogue and order page send `ViewContent` events, and Place Order sends `InitiateCheckout`.
