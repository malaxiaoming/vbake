import OrderForm from "./order-form";

export default async function OrderPage({ searchParams }) {
  const { cakeId } = await searchParams;
  return <OrderForm cakeId={cakeId} />;
}
