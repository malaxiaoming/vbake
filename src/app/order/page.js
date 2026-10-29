import OrderForm from "./order-form";
import Faq from "@/components/faq";

export default async function OrderPage({ searchParams }) {
  const { cakeId } = await searchParams;
  return (
    <>
      <OrderForm cakeId={cakeId} />
      <section className="mx-auto max-w-3xl px-3 pb-16 sm:px-6">
        <h2 className="mb-6 text-center text-2xl font-semibold sm:text-3xl">Questions before you order?</h2>
        <Faq />
      </section>
    </>
  );
}
