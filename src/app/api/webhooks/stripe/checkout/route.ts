import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { Engine } from "@thirdweb-dev/engine";
import { getNft } from "@/queries/getNft";
import initializeFirebaseServer from "@/utils/initFirebaseAdmin";
import { arrayUnion } from "firebase/firestore";
import { title } from "process";
import { FieldValue } from "firebase-admin/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export async function GET(request: NextRequest) {
  try {
    const nftData = {
      //...tx,
      id: "121256575",
      slug: "12121",
    };
    const { db } = initializeFirebaseServer();

    const userRef = db
      .collection("users")
      .doc("0x155dC109b493694E188E7Cf8cBb7A2F3D04B78cb");

    console.log(userRef);

    userRef.set({ library: FieldValue.arrayUnion(nftData) }, { merge: true });

    // db.doc(`users/0x155dC109b493694E188E7Cf8cBb7A2F3D04B78cb`).set(
    //   { library: arrayUnion({}) },
    //   { merge: true }
    // );

    return new Response("RESPONSE EXECUTE", {
      status: 200,
    });
  } catch (e) {
    console.log(e);

    return new Response("RESPONSE EXECUTE", {
      status: 200,
    });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const BACKEND_WALLET_ADDRESS = process.env.BACKEND_WALLET_ADDRESS!;
  const CHAIN = process.env.NEXT_PUBLIC_CHAIN!;

  let tx: any;

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

      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted: any = event.data.object;

      const engine = new Engine({
        url: process.env.ENGINE_URL!,
        accessToken: process.env.THIRDWEB_ACCESS_TOKEN!,
      });

      try {
        const { nft } = await getData(
          checkoutSessionCompleted.metadata?.slug || ""
        );

        const contractAddress =
          checkoutSessionCompleted.metadata?.contractAddress || "";
        const address = checkoutSessionCompleted.metadata?.address || "";

        tx = await engine.erc721.mintTo(
          CHAIN,
          contractAddress,
          BACKEND_WALLET_ADDRESS,
          {
            metadata: {
              name: nft.title,
              description: nft.description,
              image: nft.image,
              //@ts-ignore
              properties: nft.atributes,
            },
            receiver: address,
          }
        );

        const { db } = initializeFirebaseServer();

        const nftData = {
          ...tx,
          id: nft.id,
          slug: nft.slug,
          type: nft.slug,
          image: nft.image,
          title: nft.image,
          creator: nft.creator,
        };

        const userRef = db.collection("users").doc(address);

        userRef.set(
          { library: FieldValue.arrayUnion(nftData) },
          { merge: true }
        );
      } catch (e) {
        return new Response(`Webhook Error: ${e}`, {
          status: 400,
        });
      }

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
