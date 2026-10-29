import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarHeart, Clock, Instagram, MessageCircle, Quote, Truck } from "lucide-react";
import { cakes, getStartingPrice } from "@/data/cakes";
import { contactInfo } from "@/data/contact";
import { reviews } from "@/data/reviews";
import ReviewChat from "@/components/home/review-chat";
import Faq from "@/components/faq";
import PromoCarousel from "@/components/home/promo-carousel";
import FlamingReveal from "@/components/home/flaming-reveal";

const signatureCakes = [
  { id: "coriander", tagline: "Our most-talked-about cake. Fresh, bold and unlike anything else." },
  { id: "flaming", tagline: "Light it up and watch the top burn away to reveal a hidden photo." },
  { id: "mahjong", tagline: "A playful centrepiece for the mahjong lovers in your life." },
].map((item) => ({ ...cakes.find((cake) => cake.id === item.id), tagline: item.tagline }));

const highlights = [
  { icon: CalendarHeart, title: "Made to order", text: "Every cake baked fresh for your date" },
  { icon: Truck, title: "Free local delivery", text: "Around Sri Petaling, OUG & Bukit Jalil" },
  { icon: MessageCircle, title: "Order on WhatsApp", text: "Quick replies, easy changes" },
  { icon: Clock, title: "Open 7 days", text: contactInfo.businessHours.weekdays },
];

const steps = [
  { title: "Choose your cake", text: "Browse our designs and pick the one that fits your celebration." },
  { title: "Pick size, flavour & date", text: "Sizes from 5 to 10 inch. Choose your delivery date on the calendar." },
  { title: "Send on WhatsApp", text: "Your order arrives in our chat. We confirm the details and payment with you." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush/60 to-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-2 md:pb-20 md:pt-16">
          <div className="text-center md:text-left">
            <p className="eyebrow">Home bakery · Sri Petaling, KL</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-cocoa sm:text-5xl lg:text-6xl">
              Custom cakes, baked with love in KL
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-cocoa-soft md:mx-0">
              Birthday, wedding and surprise cakes made to order, from our signature Coriander Cake to
              photo-reveal Flaming Cakes.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link href="/order" className="btn-primary w-full sm:w-auto">
                Order a cake <ArrowRight size={18} />
              </Link>
              <Link href="/cakes" className="btn-outline w-full sm:w-auto">
                Browse cakes
              </Link>
            </div>
            <p className="mt-5 text-sm text-cocoa-soft">
              Cakes from <span className="font-semibold text-cocoa">RM 130</span> · 5 to 10 inch
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-sage" aria-hidden="true" />
            <div className="absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-blush-deep/60" aria-hidden="true" />
            <div className="relative grid grid-cols-5 gap-3">
              <div className="relative col-span-3 row-span-2 aspect-[3/4] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/cakes/coriander-cake.webp"
                  alt="VBake Coriander Cake with fresh coriander on top"
                  fill
                  sizes="(max-width: 768px) 60vw, 300px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/cakes/crystal-cake.webp"
                  alt="VBake Crystal Cake"
                  fill
                  sizes="(max-width: 768px) 40vw, 200px"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/cakes/mahjong-cake.webp"
                  alt="VBake Mahjong Cake"
                  fill
                  sizes="(max-width: 768px) 40vw, 200px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-cocoa/10 bg-white/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="rounded-full bg-sage p-2.5 text-sage-deep">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-cocoa-soft">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature cakes */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="text-center">
          <p className="eyebrow">Only at VBake</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Our signature cakes</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatureCakes.map((cake) => (
            <Link
              key={cake.id}
              href={`/order?cakeId=${cake.id}`}
              className="card group overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/5]">
                <Image
                  src={cake.img}
                  alt={cake.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold">{cake.name}</h3>
                  <p className="shrink-0 text-sm text-cocoa-soft">
                    from <span className="font-semibold text-rose">{getStartingPrice(cake)}</span>
                  </p>
                </div>
                <p className="mt-2 text-cocoa-soft">{cake.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-semibold text-rose">
                  Order this cake <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/cakes" className="btn-outline">
            See all cakes <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Flaming cake feature */}
      <section className="bg-sage/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="mx-auto w-full max-w-sm">
            <FlamingReveal />
            <p className="mt-3 text-center text-sm text-cocoa-soft">Drag the slider to see the reveal</p>
          </div>
          <div className="text-center md:text-left">
            <p className="eyebrow">The Flaming Cake</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">A surprise they won&apos;t forget</h2>
            <p className="mt-5 text-lg text-cocoa-soft">
              Write your message on top. When the candle is lit, the top layer burns away to reveal your
              favourite photo, printed underneath. Perfect for birthdays and anniversaries.
            </p>
            <Link href="/order?cakeId=flaming" className="btn-primary mt-8">
              Order a Flaming Cake <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="text-center">
          <p className="eyebrow">Kind words</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">What our customers say</h2>
          <p className="mx-auto mt-4 max-w-lg text-cocoa-soft">Real messages our customers sent us on WhatsApp.</p>
        </div>
        <div className="mt-10 gap-6 sm:columns-2 lg:columns-3">
          {reviews.map((review) => (
            <figure key={review.cake} className="card mb-6 break-inside-avoid p-6">
              <Quote size={24} className="text-blush-deep" aria-hidden="true" />
              <blockquote className="mt-3">
                <p className="text-lg leading-relaxed">{review.quote}</p>
                {review.translation && (
                  <p className="mt-2 text-sm italic text-cocoa-soft">&ldquo;{review.translation}&rdquo;</p>
                )}
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-sage-deep">{review.cake}</span>
                <ReviewChat screenshot={review.screenshot} cake={review.cake} />
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Instagram size={18} /> Follow us on Instagram
          </a>
        </div>
      </section>

      {/* What's new */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mb-8 text-center">
          <p className="eyebrow">What&apos;s new</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Fresh from our kitchen</h2>
        </div>
        <PromoCarousel />
      </section>

      {/* How to order */}
      <section className="bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Ordering is easy</h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="card flex gap-4 p-5 md:block md:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush font-display text-lg font-semibold text-rose">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold md:mt-4">{step.title}</h3>
                  <p className="mt-1 text-cocoa-soft md:mt-2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center text-sm text-cocoa-soft">
            Most cakes need 3 to 7 days&apos; notice. Need it sooner? WhatsApp us and we&apos;ll check.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mb-8 text-center">
          <p className="eyebrow">Good to know</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Frequently asked questions</h2>
        </div>
        <Faq />
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="rounded-[2rem] bg-gradient-to-br from-blush to-blush-deep/70 px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-semibold sm:text-4xl">Planning a celebration?</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-cocoa-soft">
            Tell us your idea and we&apos;ll help you design the perfect cake.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/order" className="btn-primary w-full sm:w-auto">
              Start your order
            </Link>
            <a
              href={contactInfo.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              WhatsApp {contactInfo.phone.number}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
