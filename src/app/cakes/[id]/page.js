import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cakes, getStartingPrice, sizeServings } from "@/data/cakes";
import { flavors, getFlavorById } from "@/data/flavors";
import { contactInfo } from "@/data/contact";
import { siteUrl } from "@/lib/site";

const getCake = (id) => cakes.find((cake) => cake.id === id);
const priceNumber = (price) => parseInt(price.replace(/[^0-9]/g, ""));
const selectableFlavorCount = flavors.standard.length + flavors.premium.length + flavors.luxury.length;

export function generateStaticParams() {
  return cakes.map((cake) => ({ id: cake.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const cake = getCake(id);
  if (!cake) return {};
  return {
    // cakes/layout.js sets its own title, which stops the root "%s | VBake.KL" template reaching here
    title: { absolute: `${cake.name} in KL | VBake.KL` },
    description: `${cake.description} From ${getStartingPrice(cake)}. Order from VBake.KL, Sri Petaling, Kuala Lumpur.`,
    openGraph: { images: [cake.img] },
  };
}

export default async function CakePage({ params }) {
  const { id } = await params;
  const cake = getCake(id);
  if (!cake) notFound();

  const sizes = Object.entries(cake.sizes);
  const prices = sizes.map(([, price]) => priceNumber(price));
  // The next three cakes in the catalogue, wrapping around
  const index = cakes.indexOf(cake);
  const otherCakes = [1, 2, 3].map((offset) => cakes[(index + offset) % cakes.length]);
  const fixedFlavor = cake.fixedFlavor ? getFlavorById(cake.fixedFlavor) : null;

  // schema.org Product details for Google search results
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cake.name,
    description: cake.description,
    image: `${siteUrl}${cake.img}`,
    brand: { "@type": "Brand", name: "VBake.KL" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "MYR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: sizes.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 md:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <Link href="/cakes" className="inline-flex items-center gap-1 text-sm font-medium text-cocoa-soft hover:text-rose">
        <ArrowLeft size={16} /> All cakes
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-start">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_2px_20px_rgba(74,46,34,0.12)]">
          <Image
            src={cake.img}
            alt={cake.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="eyebrow">{cake.occasions.join(" · ")}</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{cake.name}</h1>
          <p className="mt-3 text-lg text-cocoa-soft">
            from <span className="font-semibold text-rose">{getStartingPrice(cake)}</span>
          </p>
          <p className="mt-5 text-lg text-cocoa-soft">{cake.description}</p>

          <h2 className="mt-8 text-xl font-semibold">Sizes &amp; prices</h2>
          <div className="mt-3 overflow-hidden rounded-2xl border border-cocoa/10 bg-white">
            <table className="w-full text-left">
              <tbody>
                {sizes.map(([size, price]) => (
                  <tr key={size} className="border-b border-cocoa/10 last:border-0">
                    <th scope="row" className="px-4 py-3 font-semibold">{size}</th>
                    <td className="px-4 py-3 text-cocoa-soft">{sizeServings[size]}</td>
                    <td className="px-4 py-3 text-right font-semibold text-rose">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-8 text-xl font-semibold">Flavour</h2>
          <p className="mt-2 text-cocoa-soft">
            {fixedFlavor
              ? `Available in ${fixedFlavor.name} only.`
              : `Choose from ${selectableFlavorCount} flavours, from classic chocolate to burnt cheesecake. Some premium flavours have a small top-up.`}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/order?cakeId=${cake.id}`} className="btn-primary w-full sm:w-auto">
              Order this cake <ArrowRight size={18} />
            </Link>
            <a
              href={`${contactInfo.phone.whatsappUrl}?text=${encodeURIComponent(`Hi VBake, I'd like to ask about the ${cake.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* More cakes */}
      <section className="mt-20">
        <h2 className="text-center text-3xl font-semibold">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {otherCakes.map((other, index) => (
            <Link
              key={other.id}
              href={`/cakes/${other.id}`}
              className={`card group overflow-hidden transition-transform hover:-translate-y-1 ${index === 2 ? "hidden lg:block" : ""}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={other.img}
                  alt={other.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-semibold sm:text-lg">{other.name}</h3>
                <p className="mt-1 text-sm text-cocoa-soft">
                  from <span className="font-semibold text-rose">{getStartingPrice(other)}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
