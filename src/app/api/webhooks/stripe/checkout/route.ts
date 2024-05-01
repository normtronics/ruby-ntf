import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { Engine } from "@thirdweb-dev/engine";
import { getNft } from "@/queries/getNft";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const BACKEND_WALLET_ADDRESS = process.env.BACKEND_WALLET_ADDRESS!;
  const CHAIN = process.env.NEXT_PUBLIC_CHAIN!;

  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;

      const engine = new Engine({
        url: process.env.ENGINE_URL!,
        accessToken: process.env.THIRDWEB_ACCESS_TOKEN!,
      });

      try {
        const { nft } = await getData(
          checkoutSessionAsyncPaymentSucceeded.metadata?.slug || ""
        );

        const tx = await engine.erc721.mintTo(
          CHAIN,
          checkoutSessionAsyncPaymentSucceeded.metadata?.contractAddress || "",
          BACKEND_WALLET_ADDRESS,
          {
            metadata: {
              name: nft.title,
              description: nft.description,
              image: nft.image,
              //@ts-ignore
              properties: nft.atributes,
            },
            receiver:
              checkoutSessionAsyncPaymentSucceeded.metadata?.address || "",
          }
        );
      } catch (e) {
        return new Response(`Webhook Error: ${e}`, {
          status: 400,
        });
      }

      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted: any = event.data.object;

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}

async function getData(slug: string) {
  const data = await getNft(slug);

  return { nft: data.nft };
}
