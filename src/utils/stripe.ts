import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;


export const checkout = async (id: string) => {
  const stripe = await getStripe()

  await stripe?.redirectToCheckout({
    mode: 'payment',
    lineItems: [
      {
        price: id,
        quantity: 1
      }
    ],
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin
  })
}
