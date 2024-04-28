import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request, res: Response) { 
  if (req.method !== 'POST') return NextResponse.json({ error: 'Only Post' }, { status: 401 });

  const { address, amount } = await req.json();

  if(!address) {
    return NextResponse.json({ error: 'No Address' }, { status: 401 });
  }

  try {
    const payment_intent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: "Payment description",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { address },
    });
    return NextResponse.json(payment_intent, { status: 200 });

  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
      return NextResponse.json({ error: `Error ${errorMessage}`}, { status: 500 });
  }
  
}